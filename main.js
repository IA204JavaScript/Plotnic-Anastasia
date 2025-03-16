// main.js

// Шаг 1. Массив транзакций
const transactions = [
    {
      transaction_id: '1',
      transaction_date: '2025-03-01',
      transaction_amount: 200,
      transaction_type: 'debit',
      transaction_description: 'Оплата за услуги связи',
      merchant_name: 'МТС',
      card_type: 'debit'
    },
    {
      transaction_id: '2',
      transaction_date: '2025-03-01',
      transaction_amount: 500,
      transaction_type: 'credit',
      transaction_description: 'Пополнение счета',
      merchant_name: 'ПриватБанк',
      card_type: 'credit'
    },
    {
      transaction_id: '3',
      transaction_date: '2025-03-02',
      transaction_amount: 150,
      transaction_type: 'debit',
      transaction_description: 'Покупка в магазине',
      merchant_name: 'Лента',
      card_type: 'debit'
    }
  ];
  
  // Шаг 2. Функции для анализа транзакций
  
  /**
   * Возвращает массив уникальных типов транзакций
   * @param {Array} transactions - Массив транзакций
   * @returns {Array} - Массив уникальных типов транзакций
   */
  function getUniqueTransactionTypes(transactions) {
    const types = transactions.map(transaction => transaction.transaction_type);
    return [...new Set(types)];
  }
  
  /**
   * Вычисляет сумму всех транзакций
   * @param {Array} transactions - Массив транзакций
   * @returns {number} - Сумма всех транзакций
   */
  function calculateTotalAmount(transactions) {
    return transactions.reduce((total, transaction) => total + transaction.transaction_amount, 0);
  }
  
  /**
   * Вычисляет сумму транзакций за указанный год, месяц и день
   * @param {Array} transactions - Массив транзакций
   * @param {number} year - Год
   * @param {number} [month] - Месяц
   * @param {number} [day] - День
   * @returns {number} - Сумма транзакций за указанный период
   */
  function calculateTotalAmountByDate(transactions, year, month = null, day = null) {
    return transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      if (transactionDate.getFullYear() === year &&
          (month === null || transactionDate.getMonth() + 1 === month) &&
          (day === null || transactionDate.getDate() === day)) {
        return total + transaction.transaction_amount;
      }
      return total;
    }, 0);
  }
  
  /**
   * Возвращает транзакции указанного типа (debit или credit)
   * @param {Array} transactions - Массив транзакций
   * @param {string} type - Тип транзакции
   * @returns {Array} - Массив транзакций указанного типа
   */
  function getTransactionByType(transactions, type) {
    return transactions.filter(transaction => transaction.transaction_type === type);
  }
  
  /**
   * Возвращает транзакции в указанном диапазоне дат
   * @param {Array} transactions - Массив транзакций
   * @param {string} startDate - Начало диапазона
   * @param {string} endDate - Конец диапазона
   * @returns {Array} - Массив транзакций в диапазоне дат
   */
  function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.transaction_date);
      return transactionDate >= start && transactionDate <= end;
    });
  }
  
  /**
   * Возвращает транзакции с указанным merchantName
   * @param {Array} transactions - Массив транзакций
   * @param {string} merchantName - Название магазина
   * @returns {Array} - Массив транзакций с указанным merchantName
   */
  function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(transaction => transaction.merchant_name === merchantName);
  }
  
  /**
   * Вычисляет среднее значение транзакций
   * @param {Array} transactions - Массив транзакций
   * @returns {number} - Средняя сумма транзакций
   */
  function calculateAverageTransactionAmount(transactions) {
    const total = calculateTotalAmount(transactions);
    return total / transactions.length;
  }
  
  /**
   * Возвращает транзакции в заданном диапазоне сумм
   * @param {Array} transactions - Массив транзакций
   * @param {number} minAmount - Минимальная сумма
   * @param {number} maxAmount - Максимальная сумма
   * @returns {Array} - Массив транзакций с суммой в диапазоне
   */
  function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
  }
  
  /**
   * Вычисляет общую сумму дебетовых транзакций
   * @param {Array} transactions - Массив транзакций
   * @returns {number} - Сумма дебетовых транзакций
   */
  function calculateTotalDebitAmount(transactions) {
    const debitTransactions = getTransactionByType(transactions, 'debit');
    return calculateTotalAmount(debitTransactions);
  }
  
  /**
   * Возвращает месяц, в котором было больше всего транзакций
   * @param {Array} transactions - Массив транзакций
   * @returns {number} - Месяц с наибольшим количеством транзакций
   */
  function findMostTransactionsMonth(transactions) {
    const monthCounts = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.transaction_date).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(monthCounts).reduce((a, b) => b[1] > a[1] ? b : a)[0];
  }
  
  /**
   * Возвращает месяц, в котором было больше дебетовых транзакций
   * @param {Array} transactions - Массив транзакций
   * @returns {number} - Месяц с наибольшим количеством дебетовых транзакций
   */
  function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = getTransactionByType(transactions, 'debit');
    return findMostTransactionsMonth(debitTransactions);
  }
  
  /**
   * Возвращает наиболее распространенный тип транзакции
   * @param {Array} transactions - Массив транзакций
   * @returns {string} - Тип транзакции ('debit', 'credit' или 'equal')
   */
  function mostTransactionTypes(transactions) {
    const debitCount = getTransactionByType(transactions, 'debit').length;
    const creditCount = getTransactionByType(transactions, 'credit').length;
    
    if (debitCount > creditCount) {
      return 'debit';
    } else if (creditCount > debitCount) {
      return 'credit';
    } else {
      return 'equal';
    }
  }
  
  /**
   * Возвращает транзакции до указанной даты
   * @param {Array} transactions - Массив транзакций
   * @param {string} date - Указанная дата
   * @returns {Array} - Массив транзакций до указанной даты
   */
  function getTransactionsBeforeDate(transactions, date) {
    const comparisonDate = new Date(date);
    return transactions.filter(transaction => new Date(transaction.transaction_date) < comparisonDate);
  }
  
  /**
   * Возвращает транзакцию по ее уникальному идентификатору
   * @param {Array} transactions - Массив транзакций
   * @param {string} id - Идентификатор транзакции
   * @returns {Object|null} - Транзакция или null, если не найдена
   */
  function findTransactionById(transactions, id) {
    return transactions.find(transaction => transaction.transaction_id === id) || null;
  }
  
  /**
   * Возвращает новый массив с описаниями транзакций
   * @param {Array} transactions - Массив транзакций
   * @returns {Array} - Массив описаний транзакций
   */
  function mapTransactionDescriptions(transactions) {
    return transactions.map(transaction => transaction.transaction_description);
  }
  
  // Шаг 3. Тестирование функций
  console.log('Уникальные типы транзакций:', getUniqueTransactionTypes(transactions));
  console.log('Общая сумма транзакций:', calculateTotalAmount(transactions));
  console.log('Общая сумма за 2025-03-01:', calculateTotalAmountByDate(transactions, 2025, 3, 1));
  console.log('Дебетовые транзакции:', getTransactionByType(transactions, 'debit'));
  console.log('Транзакции в диапазоне дат:', getTransactionsInDateRange(transactions, '2025-03-01', '2025-03-02'));
  console.log('Транзакции в магазине Лента:', getTransactionsByMerchant(transactions, 'Лента'));
  console.log('Средняя сумма транзакций:', calculateAverageTransactionAmount(transactions));
  console.log('Транзакции в диапазоне сумм:', getTransactionsByAmountRange(transactions, 100, 500));
  console.log('Сумма дебетовых транзакций:', calculateTotalDebitAmount(transactions));
  console.log('Месяц с наибольшим количеством транзакций:', findMostTransactionsMonth(transactions));
  console.log('Месяц с наибольшими дебетовыми транзакциями:', findMostDebitTransactionMonth(transactions));
  console.log('Наиболее распространенный тип транзакции:', mostTransactionTypes(transactions));
  console.log('Транзакции до 2025-03-02:', getTransactionsBeforeDate(transactions, '2025-03-02'));
  console.log('Транзакция с ID 2:', findTransactionById(transactions, '2'));
  console.log('Описания транзакций:', mapTransactionDescriptions(transactions));
  
  