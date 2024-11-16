export interface UserHotmilhaInterface {
  user: {
    login: {
      email: string;
      id: number;
    };
    info: {
      first_name: string;
      last_name: string;
      birth_date: string;
      cpf: string;
    };
    address: {
      cep: string;
      place: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
    };
    contact: {
      cellphone: string;
      optional_cellphone: string;
      optional_landline: string;
    };
    bank_accounts: Array<{
      id: number;
      is_primary: boolean;
      bank_number: number;
      agency_number: string;
      agency_check_number: string;
      account_number: string;
      account_check_number: string;
      type: number;
      cpf: string;
    }>;
  };
  auth_token: string;
}
