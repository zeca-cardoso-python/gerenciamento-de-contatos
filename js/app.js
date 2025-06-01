// Banco de dados simples (JSON) no navegador
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Função para salvar contatos no LocalStorage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Função para renderizar a lista de contatos
function renderContacts() {
  const contactList = document.getElementById("contacts");
  contactList.innerHTML = ""; // Limpar lista antes de renderizar novamente

  if (contacts.length === 0) {
    contactList.innerHTML = "<p>Nenhum contato encontrado.</p>";
  }

  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${contact.name} - ${contact.phone} - ${contact.email}
            <button onclick="editContact(${index})">Editar</button>
            <button onclick="deleteContact(${index})">Excluir</button>
        `;
    contactList.appendChild(li);
  });
}

// Função de validação
function validateFields(name, phone, email) {
  // Verifica se o nome não está vazio
  if (!name.trim()) {
    alert("O nome é obrigatório.");
    return false;
  }

  // Verifica se o telefone segue o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
  const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    alert(
      "O telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX."
    );
    return false;
  }

  // Verifica se o e-mail tem um formato válido
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("O e-mail deve ser válido (exemplo@dominio.com).");
    return false;
  }

  return true;
}

// Adicionar um novo contato
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    // Validação dos campos
    if (!validateFields(name, phone, email)) {
      return; // Se a validação falhar, não adiciona o contato
    }

    const newContact = { name, phone, email };
    contacts.push(newContact);
    saveContacts();
    renderContacts();

    // Limpar os campos do formulário
    document.getElementById("contact-form").reset();
  });

// Editar um contato
function editContact(index) {
  const contact = contacts[index];
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;

  // Remover o contato original (para substituí-lo)
  contacts.splice(index, 1);
  saveContacts();
  renderContacts();
}

// Excluir um contato
function deleteContact(index) {
  contacts.splice(index, 1);
  saveContacts();
  renderContacts();
}

// Renderizar contatos na inicialização
renderContacts();
