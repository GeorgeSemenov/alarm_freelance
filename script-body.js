//это тело  любого скрипта по парсингу сайтов фриланса - нужно лишь заменить значения части переменных, они выведены в первых строках главной функции.
//Чтобы подстроиться под другой фриланс сайт - нужно прописать правильный путь к хранилищу проектов и описать первые функции
//Также, нужно понимать что локальное хранилище хранит данные как строка, а не как массив, поэтому приходится каждый раз преобразовывать туда и обратно.
$(document).ready(function(){
  let project_nodes = $('div > table > tbody > tr');/*массив узлов всех проектов*/
  function is_project_premium(node){ return ($(node).children().length == 1) } ;/*Условие премиальности*/
  function get_premium_project_description(node){return $(node).find('td > p').text()}
  function get_project_description(node){return $(node).find('td > a').data('original-title')}
  let color_for_new_project = "rgba(255,0,0,0.2)";/*в эту переменную ты вписываешь цвет, которым хочешь выделить новые прожекты*/
  let time_before_reload = 1000*60*2; //2 минуты в милисекундах
  let new_project_favicon_link = "https://jegoteam.com/miscelenious/icons/freelancehunt%20altered.webp";

  var now = new Date();
  console.log(`Parse script startet at\n${now}`);/*для понимания, когда был запущен скрипт*/

  console.log(`Разрешение на уведомления = ${Notification.permission}`)
  if( Notification.permission === 'granted'){
    showTime();
  }else if(Notification.permission !== 'denied'){
    Notification.requestPermission().then(permission => {
      console.log(`permission = ${Notification.permission}`);
    })
  }

  const SEPARATOR = '| >(-_-)< |';//Символ который будет использоваться для конвертации массива в строку и наоборот.
  let premium_projects = localStorage.getItem('premium_projects')? localStorage.getItem('premium_projects').split(SEPARATOR) : [] ;/*массив премиальных проектов хранящийся в локальном хранилище*/
  let projects =localStorage.getItem('projects')? localStorage.getItem('projects').split(SEPARATOR) : [] ; /*массив не премиальных проектов хранящийся в локальном хранилище*/
  let number_of_projects = project_nodes.length;
  let project_description;
  let is_there_new_project_appear = false;

  for (let i=0; i < number_of_projects ; i++){//Рабочий цикл.
    let node = project_nodes[i];

    $(node).css({"background-color": "transparent"}); /*Удали эту запись*/ 

    if(is_project_premium(node)){
      project_description = get_premium_project_description(node);
      check_and_store(premium_projects,project_description,node);
    }else{
      project_description = get_project_description(node);
      check_and_store(projects,project_description,node);
    }
  };

  if(is_there_new_project_appear){
    alert(`There new job уджоба`);
    let link = document.querySelector("link[rel~='icon']");
    link.href = new_project_favicon_link;
  }

  localStorage.setItem('premium_projects', premium_projects.join(SEPARATOR));
  localStorage.setItem('projects', projects.join(SEPARATOR));
  // console.log(`premium_projects.length = ${premium_projects.length}\nprojects.length = ${projects.length}`);

  setTimeout(()=>{
    window.location.reload();/*перезагружаем страничку*/
  },time_before_reload)

  /*Дальше идут служебные функшон*/

  function check_and_store(arr=[],desc,node){
    if(!arr.includes(desc)){
      arr.push(desc);
      arr.splice(number_of_projects,arr.length); //Эта строка удаляет все элементы в хранимом массиве, после числа равного числу проектов на странице в данный момент
      $(node).css({"background-color": color_for_new_project});
      is_there_new_project_appear = true;
      // var snd = new Audio("https://jegoteam.com/miscelenious/fart-sound.mp3"); 
      // snd.play();
    }
  }
});/*Конеч тела функции*/
