//это тело  любого скрипта по парсингу сайтов фриланса - нужно лишь заменить значения части переменных, они выведены в первых строках главной функции.
//Чтобы подстроиться под другой фриланс сайт - нужно прописать правильный путь к хранилищу проектов и описать первые функции
//Также, нужно понимать что локальное хранилище хранит данные как строка, а не как массив, поэтому приходится каждый раз преобразовывать туда и обратно.
$(document).ready(function(){
  let project_nodes = $('div > table > tbody > tr');/*массив узлов всех проектов*/
  function is_project_premium(node){ return ($(node).children().length == 1) } ;/*Условие премиальности*/
  function get_premium_project_description(node){return $(node).find('td > p').text()}
  function get_project_description(node){return $(node).find('td > a').data('original-title')}
  let color_for_new_project = "rgba(255,0,0,0.2)";/*в эту переменную ты вписываешь цвет, которым хочешь выделить новые прожекты*/

  const SEPARATOR = '| >(-_-)< |';//Символ который будет использоваться для конвертации массива в строку и наоборот.
  let premium_projects = localStorage.getItem('premium_projects')? localStorage.getItem('premium_projects').split(SEPARATOR) : [] ;/*массив премиальных проектов хранящийся в локальном хранилище*/
  let projects =localStorage.getItem('projects')? localStorage.getItem('projects').split(SEPARATOR) : [] ; /*массив не премиальных проектов хранящийся в локальном хранилище*/
  let number_of_projects = project_nodes.length;
  let project_description;

  for (i=0; i < number_of_projects ; i++){//Рабочий цикл.
    let node = project_nodes[i];

    $(node).css({"background-color": "transparent"}); /*Удали эту запись*/ 

    if(is_project_premium(node)){
      project_description = get_premium_project_description(node);
      check_store_and_alarmed(premium_projects,project_description,node);
    }else{
      project_description = get_project_description(node);
      check_store_and_alarmed(projects,project_description,node);
    }
  };

  localStorage.setItem('premium_projects', premium_projects.join(SEPARATOR));
  localStorage.setItem('projects', projects.join(SEPARATOR));
  // console.log(`premium_projects.length = ${premium_projects.length}\nprojects.length = ${projects.length}`);
  function check_store_and_alarmed(arr=[],desc,node){
    if(!arr.includes(desc)){
      arr.push(desc);
      arr.splice(number_of_projects,arr.length); //Эта строка удаляет все элементы в хранимом массиве, после числа равного числу проектов на странице в данный момент
      $(node).css({"background-color": color_for_new_project});
      // var snd = new Audio("https://jegoteam.com/miscelenious/fart-sound.mp3"); 
      // snd.play();
    }
  }
});/*Конеч тела функции*/
