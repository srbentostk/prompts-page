// Carrega os dados do JSON e popula a página
fetch('https://raw.githubusercontent.com/srbentostk/prompts/refs/heads/main/index.json')
    .then(response => response.json())
    .then(data => {
        // Armazena os dados globalmente
        window.promptData = data;
        displayPrompts(data);
    });

// Exibe os prompts no conteúdo
function displayPrompts(data) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Limpa o conteúdo

    data.forEach(prompt => {
        const promptElement = document.createElement('div');
        promptElement.classList.add('prompt');

        promptElement.innerHTML = `
            <h2>${prompt.nome}</h2>
            <p>${prompt.descricao}</p>
            <p><strong>Tags:</strong> ${prompt.tags.join(', ')}</p>
            <a href="${prompt.url}" target="_blank">Acessar Prompt</a>
        `;

        content.appendChild(promptElement);
    });
}

// Implementação do modo noturno
const themeSwitch = document.getElementById('theme-switch');
const themeIcon = document.getElementById('theme-icon');

// Verifica o tema salvo no localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
    themeIcon.textContent = '🌙';
}

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌞';
        localStorage.setItem('theme', 'light');
    }
});

// Implementação das categorias
const categories = [
    'Código', 'Criação de Conteúdo', /* ... restante das categorias ... */ 'Desenvolvimento Profissional'
];

const mainCategories = categories.slice(0, 10); // Principais categorias
const categoriesList = document.getElementById('categories');
const expandButton = document.getElementById('expand-categories');
let categoriesExpanded = false;

function displayCategories(catList) {
    categoriesList.innerHTML = '';
    catList.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category;
        li.addEventListener('click', () => filterByCategory(category));
        categoriesList.appendChild(li);
    });
}

// Exibe as principais categorias inicialmente
displayCategories(mainCategories);

expandButton.addEventListener('click', () => {
    if (!categoriesExpanded) {
        displayCategories(categories);
        expandButton.textContent = 'Recolher Categorias';
        categoriesExpanded = true;
    } else {
        displayCategories(mainCategories);
        expandButton.textContent = 'Expandir Categorias';
        categoriesExpanded = false;
    }
});

// Implementação da busca de categorias
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredCategories = categories.filter(category =>
        category.toLowerCase().includes(query)
    );
    displayCategories(filteredCategories);
});

// Filtra os prompts pela categoria selecionada
function filterByCategory(category) {
    const filteredPrompts = window.promptData.filter(prompt =>
        prompt.tags.includes(category)
    );
    displayPrompts(filteredPrompts);
}

