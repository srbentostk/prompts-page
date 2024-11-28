// Carrega os dados do JSON e popula a página
fetch('https://raw.githubusercontent.com/srbentostk/prompts/refs/heads/main/index.json')
    .then(response => response.json())
    .then(data => {
        // Armazena os dados globalmente
        window.promptData = data;
        // Atualiza o contador de prompts
        document.getElementById('prompt-count').textContent = data.length;
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
                        <button class="open-prompt-button" data-url="${prompt.url}" data-nome="${prompt.nome}">Abrir Prompt</button>
                    </td>
                </tr>
            </table>
        `;

        content.appendChild(promptCard);
    });
    // Adicionar event listeners aos botões "Abrir Prompt"
    const openButtons = document.querySelectorAll('.open-prompt-button');
    openButtons.forEach(button => {
        button.addEventListener('click', openPromptPopup);
    });
}
function openPromptPopup(event) {
    const url = event.target.getAttribute('data-url');
    const nome = event.target.getAttribute('data-nome');

    // Exibe o nome do prompt no popup
    document.getElementById('popup-prompt-name').textContent = nome;

    // Faz a requisição para obter o texto do prompt
    fetch(url)
        .then(response => response.text())
        .then(text => {
            if (text.trim().startsWith('```markdown')) {
                text = text.trim().slice(3).trim();
            }
            
             // Remove '```' do final, se existir
             if (text.trim().endsWith('```')) {
                text = text.trim().slice(0, -3).trim();
            }

            // Remove '```' do início, se existir
            if (text.trim().startsWith('```')) {
                text = text.trim().slice(3).trim();
            }
            // Exibe o texto no popup
            document.getElementById('popup-prompt-text').textContent = text;

            // Exibe o popup
            document.getElementById('prompt-popup').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Erro ao carregar o prompt:', error);
            alert('Ocorreu um erro ao carregar o prompt.');
        });
}
// Fecha o popup ao clicar no botão de fechar
document.querySelector('.close-popup').addEventListener('click', () => {
    document.getElementById('prompt-popup').classList.add('hidden');
});

// Fecha o popup ao clicar fora do conteúdo
document.getElementById('prompt-popup').addEventListener('click', (event) => {
    if (event.target === document.getElementById('prompt-popup')) {
        document.getElementById('prompt-popup').classList.add('hidden');
    }
});
// Event listener para o botão "Copiar Texto":
document.getElementById('copy-button').addEventListener('click', () => {
    const promptText = document.getElementById('popup-prompt-text').textContent;
    navigator.clipboard.writeText(promptText).then(() => {
        alert('Texto copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar o texto:', err);
    });
});
// Novo campo de pesquisa para filtrar prompts pelo texto
document.getElementById('prompt-search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredPrompts = window.promptData.filter(prompt =>
        prompt.nome.toLowerCase().includes(query) ||
        prompt.descricao.toLowerCase().includes(query) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(query))
    );

    displayPrompts(filteredPrompts);

    // Atualiza o contador de prompts exibidos
    document.getElementById('prompt-count').textContent = filteredPrompts.length;
});
function filterPrompts() {
    const query = document.getElementById('prompt-search').value.toLowerCase();
    let filteredPrompts = window.promptData;

    // Filtra por categorias selecionadas
    if (selectedCategories.length > 0) {
        filteredPrompts = filteredPrompts.filter(prompt =>
            selectedCategories.every(category => prompt.tags.includes(category))
        );
    }

    // Filtra por texto de pesquisa
    if (query) {
        filteredPrompts = filteredPrompts.filter(prompt =>
            prompt.nome.toLowerCase().includes(query) ||
            prompt.descricao.toLowerCase().includes(query) ||
            prompt.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    displayPrompts(filteredPrompts);

    // Atualiza o contador de prompts exibidos
    document.getElementById('prompt-count').textContent = filteredPrompts.length;
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
// Atualizar o event listener da pesquisa
document.getElementById('prompt-search').addEventListener('input', filterPrompts);
// Função para lidar com a seleção de categorias
function handleCategorySelection() {
    const checkboxes = document.querySelectorAll('#categories input[type="checkbox"]');
    selectedCategories = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });
    //filterByCategories();
    filterPrompts();
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

