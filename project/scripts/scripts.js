document.addEventListener('DOMContentLoaded', () => {
  const eventsUrl = './data/events.json';
  const eventList = document.getElementById('event-list');
  const joinForm = document.getElementById('join-form');
  const memberCountDisplay = document.getElementById('member-count');
  const friendsList = document.getElementById('friends-list');
  const friendsMessage = document.getElementById('friends-message');
  const welcomeModal = document.getElementById('welcome-modal');
  const modalMessage = document.getElementById('modal-message');
  const closeModalButton = document.getElementById('close-modal');

  //LN - If eventList exists, fetch and display upcoming events
  if (eventList) {
    fetch(eventsUrl)
      .then(response => response.json())
      .then(events => {
        events.forEach(event => {
          const isPastEvent = new Date(event.date) < new Date();
          if (!isPastEvent) {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
              <h3>${event.name}</h3>
              <p>Date: ${event.date}</p>
              <p>Location: ${event.location}</p>
              <p>${event.description}</p>
            `;
            eventList.appendChild(eventCard);
          }
        });
      })
      .catch(error => console.error('Error loading events:', error));
  }

  //LN - If joinForm exists, initialize member count and handle form submission
  if (joinForm) {
    const members = JSON.parse(localStorage.getItem('members') || '[]');
    memberCountDisplay.textContent = `Members: ${members.length}`;

    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const experience = document.getElementById('experience').value;
      const city = document.getElementById('city').value;

      const member = { name, email, experience, city };
      members.push(member);
      localStorage.setItem('members', JSON.stringify(members));
      memberCountDisplay.textContent = `Members: ${members.length}`;

      //LN - Display friends from the selected city
      const cityFriends = members.filter(m => m.city === city && m.name !== name);
      friendsList.innerHTML = '';
      if (cityFriends.length > 0) {
        cityFriends.forEach(friend => {
          const li = document.createElement('li');
          li.textContent = `${friend.name} (${friend.experience})`;
          friendsList.appendChild(li);
        });
        friendsMessage.style.display = 'block';
      } else {
        friendsMessage.style.display = 'none';
      }

      //LN - Show modal with welcome message
      modalMessage.textContent = `Welcome, ${name}! You're now a member of the Pretoria Running Club!`;
      welcomeModal.style.display = 'flex'; 
      welcomeModal.setAttribute('aria-hidden', 'false');
      closeModalButton.focus();

      joinForm.reset();
    });

    //LN - Close modal on button click or Escape key
    if (closeModalButton) {
      closeModalButton.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        welcomeModal.setAttribute('aria-hidden', 'true');
        joinForm.querySelector('#name').focus();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && welcomeModal.style.display === 'flex') {
          welcomeModal.style.display = 'none';
          welcomeModal.setAttribute('aria-hidden', 'true');
          joinForm.querySelector('#name').focus();
        }
      });
    }
  }
});