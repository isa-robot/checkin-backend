interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      address: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      address: 'site@example.com.br',
      name: 'Isa',
    },
  },
} as IMailConfig;
