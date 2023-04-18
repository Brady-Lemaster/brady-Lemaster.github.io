alert("NOTICE!");
alert("This chat does not allow extreme language.");
alert("On breaking this rule account will be terminated.");

passwordatmpt = prompt("Enter Password");

function getName() { 
  epeva="SG9sbWl1bU9yYW5nZTgxOTg1NQ==";passworderikv=atob(epeva);epeva="clr";
  if (passwordatmpt==passworderikv) {username = "Erik";}
  passworderikv = "clr";
  epmla="RGFybXN0YWR0aXVtR3JlZW41NDUxMjQ=";passwordmasonl=atob(epmla);epmla="clr";
  if (passwordatmpt==passwordmasonl) {username = "Mason";}
  passwordmasonl = "clr";
  epcmu="TGVhZFB1cnBsZTIwNDg5Mw==";passwordcalebm=atob(epcmu);epcmu="clr";
  if (passwordatmpt==passwordcalebm) {username = "Caleb";}
  passwordcalebm = "clr";
  epble="Y293c2F5";passwordbradyl=atob(epble);epble="clr";
  if (passwordatmpt==passwordbradyl) {username = "Brady";}
  passwordbradyl = "clr";
  epasa="VGVyYml1bVBpbms1NzQzNDg=";passwordalexs=atob(epasa);epasa="clr";
  if (passwordatmpt==passwordalexs) {username = "Alex";}
  passwordalexs = "clr";
  eptme="TmVvblllbGxvdzc2ODgxMw==";passwordtuckerm=atob(eptme);eptme="clr";
  if (passwordatmpt==passwordtuckerm) {username = "Tucker";}
  passwordtuckerm = "clr";
  return username
}

const CLIENT_ID = 'HbfBa2vZG45ihRaF';

const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getName(),
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });
  
  room.on('data', (text, member) => {
     if (member) {
       
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: 'observable-room',
    message: value,
  });
  updateMembersDOM();
}

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in room:`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
  updateMembersDOM();
}
