document.addEventListener('DOMContentLoaded', () => {
    const openFormBtn = document.getElementById('openFormBtn');
    const formContainer = document.getElementById('formContainer');
    const createCardBtn = document.getElementById('createCardBtn');
    const cardGrid = document.getElementById('cardGrid');
    const themePreview = document.getElementById('themePreview');
    const themeSelect = document.getElementById('themeSelect');

    // Sample data for theme preview
    const sampleData = {
        name: "John Doe",
        title: "Software Engineer",
        email: "john@example.com",
        phone: "+1 234 567 890",
        location: "New York, USA",
        website: "www.johndoe.com",
        skills: ["JavaScript", "React", "Node.js"]
    };

    // Function to create a theme preview
    function createThemePreview() {
        const themes = ['theme-classic', 'theme-minimal', 'theme-dark', 'theme-modern'];
        themePreview.innerHTML = '';

        themes.forEach(theme => {
            const previewCard = createCard(sampleData, theme);
            previewCard.classList.add('theme-option');
            previewCard.onclick = () => {
                themeSelect.value = theme;
                document.querySelectorAll('.theme-option').forEach(card => {
                    card.classList.remove('selected');
                });
                previewCard.classList.add('selected');
            };
            themePreview.appendChild(previewCard);
        });
    }

    // Function to create a card based on selected theme
    function createCard(data, theme) {
        const card = document.createElement('div');
        card.classList.add('card', theme);

        // Card Header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.innerText = data.name;
        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.innerText = data.title;
        cardHeader.appendChild(nameElement);
        cardHeader.appendChild(titleElement);
        card.appendChild(cardHeader);

        // Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Contact Info
        const contactList = [
            { icon: 'fa-envelope', text: data.email },
            { icon: 'fa-phone', text: data.phone },
            { icon: 'fa-map-marker-alt', text: data.location },
            { icon: 'fa-globe', text: data.website }
        ];

        contactList.forEach(contact => {
            const item = document.createElement('div');
            item.classList.add('contact-item');
            const icon = document.createElement('i');
            icon.classList.add('fa', contact.icon);
            const text = document.createElement('span');
            text.innerText = contact.text;
            item.appendChild(icon);
            item.appendChild(text);
            cardBody.appendChild(item);
        });

        // Skills List
        const skillsList = document.createElement('div');
        skillsList.classList.add('skills-list');
        data.skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.classList.add('skill-tag');
            skillTag.innerText = skill;
            skillsList.appendChild(skillTag);
        });
        cardBody.appendChild(skillsList);

        card.appendChild(cardBody);
        return card;
    }

    // Open form when the button is clicked
    openFormBtn.addEventListener('click', () => {
        formContainer.style.display = 'block';
        openFormBtn.style.display = 'none';
    });

    // Create card when 'Create Card' button is clicked
    createCardBtn.addEventListener('click', () => {
        const cardData = {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            website: document.getElementById('website').value,
            skills: document.getElementById('skills').value.split(',').map(skill => skill.trim())
        };

        const theme = themeSelect.value;
        const newCard = createCard(cardData, theme);
        cardGrid.appendChild(newCard);
        formContainer.reset();
        formContainer.style.display = 'none';
        openFormBtn.style.display = 'block';
    });

    // Initialize the theme previews
    createThemePreview();
});

