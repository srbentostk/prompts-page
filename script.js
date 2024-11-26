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
    'Filosofia', 'Auto Ajuda', 'Motivação', 'Cursos', 'Pesquisa', 'Story Telling', 'Jogos', 'Visualizações', 'Dados',
    'Engenheiros de Software', 'Empreendedor', 'LinkedIn', 'Gerente de Produto', 'Marca Pessoal', 'Roteiro de Vídeo',
    'Redes Sociais', 'Imóveis', 'Apresentação', 'Coach de Vida', 'Arte', 'Ganchos', 'Guias de Estudo', 'Dicas de Aluguel',
    'Pesquisas', 'Ética', 'Desenvolvimento de Jogos', 'Gestão de Prompts', 'Negociação', 'Música', 'Jurídico', 'Debate',
    'Pesquisa de Mercado', 'Go To Market', 'Reuniões', 'SEO', 'Citações Inspiradoras', 'Limpeza de Dados', 'Solução de Problemas',
    'TikTok', 'Ciência', 'Oratória', 'Design Gráfico', 'Podcast', 'Gerente de Produto', 'Coaching', 'Construção',
    'Compra de Imóveis', 'Instagram', 'Contratação', 'Resolução de Conflitos', 'Carreira Corporativa', 'Comunicação',
    'Gestão do Tempo', 'Pequenos Negócios', 'Blog', 'Desenvolvimento Web', 'Viagem', 'Finanças', 'Bancário',
    'Regulamentações', 'Cultura', 'Liderança', 'Treinamento', 'Trabalho Remoto', 'Receitas Culinárias', 'Filosofia Alimentar',
    'Restaurante', 'Finanças Pessoais', 'Orçamento', 'Investimento', 'Beleza', 'Desenvolvimento Pessoal', 'Geração de Leads',
    'Idiomas', 'Ensino', 'Seguros', 'Medicina', 'Saúde Mental', 'Suporte ao Cliente', 'Cuidados Infantis', 'Política',
    'Desenvolvimento de Apps', 'Freelancer', 'Saúde', 'Equilíbrio Trabalho-Vida', 'Terapia', 'Governo', 'Viagens de Luxo',
    'Dicas de Fotografia', 'Academia', 'Scrum', 'Acadêmicos', 'Gestão', 'Chatbots', 'Ecoturismo', 'ONG', 'Biodiversidade',
    'Esportes', 'Estratégia', 'Criptomoedas', 'Ações', 'Email', 'Privacidade', 'Educação', 'Vídeo', 'Apps', 'Moda',
    'E-commerce', 'Feedback de Usuário', 'Economia', 'Networking', 'História', 'Projetos DIY', 'Franquias',
    'Estratégia de Negócios', 'Idioma', 'Blockchain', 'Biologia', 'Gestão de Programas', 'Anúncios', 'Notícias',
    'Gestão de Equipes', 'Negócios', 'Automação', 'Desenvolvimento de Produto', 'Escrita Criativa',
    'Livro de Colorir', 'Mudança de Carreira', 'Família', 'Paternidade', 'Vendas', 'Renda Passiva', 'Religião', 'Dieta',
    'Impostos', 'Planejamento de Eventos', 'Agile', 'Olheiro', 'Desenvolvimento de Jogadores', 'Marketing de Rede',
    'Excel', 'Entrada de Dados', 'Bem-estar', 'Jardinagem', 'Literatura', 'Acessibilidade', 'Gestão de Reputação',
    'Engajamento de Funcionários', 'Decoração', 'Design de Interiores', 'YouTube', 'Subsídios', 'Gestão de Projetos',
    'Acadêmico', 'TDAH', 'Agendamento', 'Relacionamentos', 'Roteiro', 'Diálogo', 'Crianças', 'Resolução de Problemas',
    'Fantasy Sports', 'Gestão de Liga', 'Plano de Saúde', 'RH', 'Certificação', 'Criativo', 'Halloween', 'Projetos Criativos',
    'Outline', 'Mindfulness', 'Análise', 'Alívio do Estresse', 'Documentação', 'Comunicação com Stakeholders',
    'Processo de Encerramento', 'Contabilidade', 'Análise de Dados', 'Viagem Solo', 'Guias', 'Criatividade', 'Humor',
    'Animais', 'Previsões', 'Engajamento Comunitário', 'Divulgação Religiosa', 'Planejamento Estratégico',
    'Crescimento Pessoal', 'Fitness', 'Redação de Subsídios', 'Proposta', 'Gestão de Serviços de TI', 'Gestão de Problemas',
    'Excelência Operacional', 'Aposentadoria', 'Segurança', 'Recrutamento', 'Gestão de Talentos', 'Pinterest',
    'Consultoria', 'Trading de Opções', 'Assistência Social', 'Compliance', 'Auditoria', 'Planejamento de Lições',
    'Avaliação', 'Orientação', 'Gestão de Crédito', 'Plano de Negócios', 'Fintech', 'Sistemas de Pagamento',
    'Insights do Consumidor', 'Matemática', 'TI', 'Enfermagem', 'Marketing de Afiliados', 'API',
    'Marketing Digital', 'Redação de Propostas', 'RFP', 'Desenvolvimento de Negócios', 'MBA', 'Farmacêutica',
    'Biotecnologia', 'Contabilidade Forense', 'Análise Financeira', 'Financiamento', 'Planejamento', 'ONG',
    'Desenvolvimento Comunitário', 'Suporte Comunitário', 'Captação de Recursos', 'Assistente Virtual', 'Estatística',
    'Comunidade', 'Documentário', 'Interpretação', 'Desenvolvimento Profissional'
];

const mainCategories = categories.slice(0, 20); // Exibe pelo menos 20 categorias
const categoriesList = document.getElementById('categories');
const expandButton = document.getElementById('expand-categories');
let categoriesExpanded = false;

// Lista de categorias selecionadas
let selectedCategories = [];

// Função para exibir as categorias como caixas de seleção
function displayCategories(catList) {
    categoriesList.innerHTML = '';
    catList.forEach(category => {
        const label = document.createElement('label');
        label.classList.add('category-label');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = category;
        checkbox.addEventListener('change', handleCategorySelection);

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(category));

        categoriesList.appendChild(label);
    });
}
// Função para lidar com a seleção de categorias
function handleCategorySelection() {
    const checkboxes = document.querySelectorAll('#categories input[type="checkbox"]');
    selectedCategories = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });
    filterByCategories();
}
// Função de filtragem baseada em múltiplas categorias
function filterByCategories() {
    let filteredPrompts;

    if (selectedCategories.length === 0) {
        filteredPrompts = window.promptData;
    } else {
        filteredPrompts = window.promptData.filter(prompt =>
            // Use 'every' para prompts que contenham todas as categorias selecionadas
            // Use 'some' para prompts que contenham pelo menos uma das categorias selecionadas
            selectedCategories.every(category => prompt.tags.includes(category))
        );
    }

    displayPrompts(filteredPrompts);
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

