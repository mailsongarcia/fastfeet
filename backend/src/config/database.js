module.exports = {
  dialect: 'postgres', // Banco de dados utilizado.
  host: 'localhost', // Ou se tivermos usando Toolbox, o ip.
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet', // Database criada diretamente no Postbird.
  define: {
    timestamps: true, // É gerada uma coluna Updated At e Created At em cada tabela.
    underscored: true,
    underscoredAll: true, // Padrão de tabelas e colunas underscored (!= cammelcase).
  },
};
