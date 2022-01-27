//это тело  любого скрипта по парсингу сайтов фриланса - нужно лишь заменить значения части переменных, они выведены в первых строках главной функции.
//Чтобы подстроиться под другой фриланс сайт - нужно прописать правильный путь к хранилищу проектов и описать первые функции
//Также, нужно понимать что локальное хранилище хранит данные как строка, а не как массив, поэтому приходится каждый раз преобразовывать туда и обратно.
$(document).ready(function(){
  /*Копировать отсюда*/

  // localStorage.clear(); // На случай, если нужно почитстить хранилистче

  //Для freelancehunt
  let project_nodes = $('div > table > tbody > tr');/*массив узлов всех проектов*/
  function is_project_premium(node){ return ($(node).children().length == 1) } ;/*Условие премиальности*/
  function get_premium_project_description(node){return $(node).data('published')}
  function get_project_description(node){return $(node).data('published')}
  // function get_project_description(node){return $(node).find('td > a').data('original-title')}
  let color_for_new_project = "rgba(255,0,0,0.2)";/*в эту переменную ты вписываешь цвет, которым хочешь выделить новые прожекты*/
  let time_before_reload = 1000*60*1; //1 минута в милисекундах
  let new_project_favicon_link = "https://jegoteam.com/miscelenious/icons/freelancehunt%20altered.webp";
  let notification_title = "FREELANCEHUNT FREELANCEHUNT FREELANCEHUNT FREELANCEHUNT!";

  let now = new Date();
  console.log(`Parse script startet at\n${now}`);/*для понимания, когда был запущен скрипт*/

  console.log(`Разрешение на уведомления = ${Notification.permission}`)
  if( Notification.permission === 'granted'){
    /*Сюда можно вставить код, при желании*/
  }else if(Notification.permission !== 'denied'){
    Notification.requestPermission().then(permission => {
      console.log(`permission = ${Notification.permission}`);
    })
  }
  let notification_body;
  let premium_projects = get_from_ls('premium_projects') ;/*массив премиальных проектов хранящийся в локальном хранилище*/
  let projects = get_from_ls('projects'); /*массив не премиальных проектов хранящийся в локальном хранилище*/
  let number_of_projects = project_nodes.length;
  let project_description;
  let is_there_new_project_appear = false;

  for (let i=0; i < number_of_projects ; i++){//Рабочий цикл.
    let node = project_nodes[i];

    if(is_project_premium(node)){
      project_description = get_premium_project_description(node);
      check_and_store(premium_projects,project_description,node);
    }else{
      project_description = get_project_description(node);
      check_and_store(projects,project_description,node);
    }
  };

  if(is_there_new_project_appear){
    let link = document.querySelector("link[rel~='icon']");
    link.href = new_project_favicon_link;

    push_notification();

    set_to_ls('premium_projects', premium_projects);
    set_to_ls('projects', projects);
  }

  // console.log(`premium_projects.length = ${premium_projects.length}\nprojects.length = ${projects.length}`);

  setTimeout(()=>{
    window.location.reload();/*перезагружаем страничку*/
  },time_before_reload)

  /*Дальше идут служебные функшон*/

  function check_and_store(arr=[],desc,node){
    if(!arr.includes(desc)){
      arr.unshift(desc);
      arr.splice(number_of_projects,arr.length); //Эта строка удаляет все элементы в хранимом массиве, после числа равного числу проектов на странице в данный момент
      $(node).css({"background-color": color_for_new_project});
      is_there_new_project_appear = true;
      notification_body = desc;
      console.log(`new project is = ${desc}`);
    }
  }

  function get_from_ls(ls_name){
    try{
      if (localStorage.getItem(ls_name) && localStorage.getItem(ls_name)!="undefined") {
        let getted = JSON.parse(localStorage.getItem(ls_name));
        return getted;
      }else{
        return [];
      }
    }catch(err){
      console.log(`>>>\nThere is problem in getting from ${ls_name}\n${err}\n>>>`);
      console.log(`localStorage.getItem(${ls_name}) = ${localStorage.getItem(ls_name)}`);
    }
  }
  function set_to_ls(ls_name, stored){
    try {
      if(stored && stored!="undefined"){
        localStorage.setItem(ls_name, JSON.stringify(stored));
      }else{
        console.log(`you've tried to store incorrent object = ${stored}`);
      }
    }catch (err){console.log(`>>>\nThere is problem in storing to ${ls_name}\n${err}\n>>>`);}
  }

  function push_notification(){
    const notification = new Notification(notification_title,{
      body: notification_body
    });
    console.log("you have new projects");    
  }
  /*Копировать до сюда*/
});/*Конеч тела функции*/
