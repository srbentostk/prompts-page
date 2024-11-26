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
        const promptCard = document.createElement('div');
        promptCard.classList.add('prompt-card');

        promptCard.innerHTML = `
            <table>
                <tr>
                    <td><strong>Nome:</strong></td>
                    <td>${prompt.nome}</td>
                </tr>
                <tr>
                    <td><strong>Descrição:</strong></td>
                    <td>${prompt.descricao}</td>
                </tr>
                <tr>
                    <td><strong>Tags:</strong></td>
                    <td>${prompt.tags.join(', ')}</td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: right;">
                        <a href="${prompt.url}" target="_blank" class="access-button">Acessar Prompt</a>
                    </td>
                </tr>
            </table>
        `;

        content.appendChild(promptCard);
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
    'Código', 'Criação de Conteúdo', 'Software', 'Cybersegurança', 'Ciência de Dados', 'Tecnologia', 'Análise de Texto',
    'Startups', 'Twitter', 'Marketing', 'Feedback', 'Extração de Dados', 'AI', 'Checar Gramática', 'Livros',
    'Estudantes', 'Escola', 'Trends de Tech', 'Sumário', 'Entrevista de Emprego', 'Conselho de Carreira', 'Currículo',
    'Youtube', 'Proofreading', 'Escrita', 'Psicologia', 'Colaboração', 'Brainstorm', 'Produtividade', 'Procura de Emprego',
    // ... restante das categorias ...
    'Desenvolvimento Profissional'
];

const mainCategories = categories.slice(0, 20); // Exibe pelo menos 20 categorias
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

// Estiliza o botão de expandir categorias
expandButton.classList.add('expand-button');

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
