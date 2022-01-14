//это тело  любого скрипта по парсингу сайтов фриланса - нужно лишь заменить значения части переменных.
//Чтобы подстроиться под другой фриланс сайт - нужно прописать правильный путь к хранилищу проектов и описать первые функции
$(document).ready(function(){
  let project_nodes = $('div > table > tbody > tr');/*массив узлов всех проектов*/
  function is_project_premium(node){ return ($(node).children().length == 1) } ;/*Условие премиальности*/
  function get_premium_project_description(node){return $(node).find('td > p').text()}
  function get_project_description(node){return $(node).find('td > a').data('original-title')}
  function alarm_for_node(node){$(node)}/*в эту функцию*/

  let premium_projects = [];/*массив премиальных проектов*/
  let projects =[]; /*массив не премиальных проектов*/
  let number_of_projects = project_nodes.length;
  let project_description;

  for (i=0; i < number_of_projects ; i++){//Рабочий цикл.
    let node = project_nodes[i];

    $(node).css({"background-color": "transparent"}); /*Удали эту запись*/ 

    if(is_project_premium(node)){
      project_description = get_premium_project_description(node);
      premium_projects.push(project_description);
    }else{
      project_description = get_project_description(node);
      projects.push(project_description);
    }
  };
  console.log(`premium_projects = ${premium_projects}\ncommon_projects = ${projects}`);
});

function check_store_and_alarmed(arr,desc,node){
  if(!arr.includes(desc)){
    arr.push(desc);
    arr.splice(number_of_projects,arr.length); //Эта строка удаляет все элементы в хранимом массиве, после числа равного числу проектов на странице в данный момент
    node
  }
}