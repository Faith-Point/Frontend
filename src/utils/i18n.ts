import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: "Home",
      user: "User",
      role: "Role",
      contacts: "Contacts",
      contact: "Contact",
      socialMedia: "Social Media",
      addresses: "Addresses",
      country: "Country",
      state: "State",
      city: "City",
      address: "Address",
      faithPoint: "Faith Point",
      faithPointImages: "Images",
      faithPointRating: "Rating",
      faithPointReligions: "Religions",
      faithPointSchedule: "Schedule",
      faithPointServices: "Services",
      faithPointSubscription: "Subscription",
      addressesPage: {
        title: "Addresses",
        newAddress: "New Address",
        street: "Street",
        number: "Number",
        complement: "Complement",
        neighborhood: "Neighborhood",
        city: "City",
        state: "State",
        country: "Country",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        loading: "Loading...",
        error: "Error fetching data"
      }
    }
  },
  pt: {
    translation: {
      home: "Início",
      user: "Usuário",
      role: "Permissão",
      contacts: "Contatos",
      contact: "Contato",
      socialMedia: "Redes Sociais",
      addresses: "Endereços",
      country: "País",
      state: "Estado",
      city: "Cidade",
      address: "Endereço",
      faithPoint: "Ponto de Fé",
      faithPointImages: "Imagens",
      faithPointRating: "Avaliação",
      faithPointReligions: "Religiões",
      faithPointSchedule: "Horários",
      faithPointServices: "Serviços",
      faithPointSubscription: "Assinaturas",
      addressesPage: {
        title: "Endereços",
        newAddress: "Novo Endereço",
        street: "Logradouro",
        number: "Número",
        complement: "Complemento",
        neighborhood: "Bairro",
        city: "Cidade",
        state: "Estado",
        country: "País",
        actions: "Ações",
        edit: "Editar",
        delete: "Excluir",
        loading: "Carregando...",
        error: "Erro ao buscar os dados"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
