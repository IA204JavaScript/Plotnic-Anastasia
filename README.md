

```markdown
# Отчет по лабораторной работе
```

## Введение

Целью данной лабораторной работы является изучение обработки транзакционных данных с использованием массива объектов в JavaScript. Основной задачей является создание набора функций для работы с транзакциями, а также их тестирование.

## Шаг 1: Создание массива транзакций

Для начала необходимо создать массив объектов, каждый из которых представляет собой транзакцию. Каждая транзакция имеет следующие атрибуты:

- `transaction_id`: Идентификатор транзакции
- `transaction_date`: Дата транзакции
- `transaction_amount`: Сумма транзакции
- `transaction_type`: Тип транзакции (например, дебет или кредит)
- `transaction_description`: Описание транзакции
- `merchant_name`: Название магазина или получателя
- `card_type`: Тип карты, с которой совершена транзакция

### Пример массива транзакций

```javascript
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
```

## Шаг 2: Создание функций для обработки транзакций

Теперь необходимо создать несколько функций для обработки транзакций:

1. **Получение уникальных типов транзакций**

   Эта функция возвращает список уникальных типов транзакций из массива.

   ```javascript
   function getUniqueTransactionTypes(transactions) {
     const types = transactions.map(transaction => transaction.transaction_type);
     return [...new Set(types)];
   }
   ```

2. **Подсчет общей суммы транзакций**

   Эта функция вычисляет общую сумму всех транзакций.

   ```javascript
   function calculateTotalAmount(transactions) {
     return transactions.reduce((total, transaction) => total + transaction.transaction_amount, 0);
   }
   ```

3. **Подсчет суммы транзакций по конкретной дате**

   Эта функция вычисляет общую сумму транзакций для заданной даты.

   ```javascript
   function calculateTotalAmountByDate(transactions, year, month, day) {
     return transactions
       .filter(transaction => {
         const date = new Date(transaction.transaction_date);
         return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
       })
       .reduce((total, transaction) => total + transaction.transaction_amount, 0);
   }
   ```

4. **Фильтрация транзакций по типу (например, дебетовые или кредитные)**

   Эта функция фильтрует транзакции по типу.

   ```javascript
   function getTransactionByType(transactions, type) {
     return transactions.filter(transaction => transaction.transaction_type === type);
   }
   ```

5. **Фильтрация транзакций в диапазоне дат**

   Эта функция фильтрует транзакции по диапазону дат.

   ```javascript
   function getTransactionsInDateRange(transactions, startDate, endDate) {
     const start = new Date(startDate);
     const end = new Date(endDate);
     return transactions.filter(transaction => {
       const date = new Date(transaction.transaction_date);
       return date >= start && date <= end;
     });
   }
   ```

6. **Фильтрация транзакций по имени магазина**

   Эта функция фильтрует транзакции по названию магазина.

   ```javascript
   function getTransactionsByMerchant(transactions, merchantName) {
     return transactions.filter(transaction => transaction.merchant_name === merchantName);
   }
   ```

7. **Вычисление средней суммы транзакций**

   Эта функция вычисляет среднюю сумму транзакций.

   ```javascript
   function calculateAverageTransactionAmount(transactions) {
     const total = calculateTotalAmount(transactions);
     return total / transactions.length;
   }
   ```

8. **Фильтрация транзакций по диапазону сумм**

   Эта функция фильтрует транзакции по диапазону сумм.

   ```javascript
   function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
     return transactions.filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
   }
   ```

9. **Подсчет суммы дебетовых транзакций**

   Эта функция вычисляет сумму всех дебетовых транзакций.

   ```javascript
   function calculateTotalDebitAmount(transactions) {
     return transactions
       .filter(transaction => transaction.transaction_type === 'debit')
       .reduce((total, transaction) => total + transaction.transaction_amount, 0);
   }
   ```

10. **Поиск месяца с наибольшим количеством транзакций**

    Эта функция находит месяц с наибольшим количеством транзакций.

    ```javascript
    function findMostTransactionsMonth(transactions) {
      const months = transactions.reduce((acc, transaction) => {
        const month = new Date(transaction.transaction_date).getMonth() + 1;
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});
      return Object.keys(months).reduce((maxMonth, month) => months[month] > months[maxMonth] ? month : maxMonth, Object.keys(months)[0]);
    }
    ```

11. **Поиск месяца с наибольшим количеством дебетовых транзакций**

    Эта функция находит месяц с наибольшим количеством дебетовых транзакций.

    ```javascript
    function findMostDebitTransactionMonth(transactions) {
      const months = transactions.reduce((acc, transaction) => {
        if (transaction.transaction_type === 'debit') {
          const month = new Date(transaction.transaction_date).getMonth() + 1;
          acc[month] = (acc[month] || 0) + 1;
        }
        return acc;
      }, {});
      return Object.keys(months).reduce((maxMonth, month) => months[month] > months[maxMonth] ? month : maxMonth, Object.keys(months)[0]);
    }
    ```

12. **Поиск наиболее распространенного типа транзакции**

    Эта функция находит наиболее распространенный тип транзакции.

    ```javascript
    function mostTransactionTypes(transactions) {
      const types = transactions.map(transaction => transaction.transaction_type);
      const typeCounts = types.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
      return Object.keys(typeCounts).reduce((mostCommon, type) => typeCounts[type] > typeCounts[mostCommon] ? type : mostCommon, Object.keys(typeCounts)[0]);
    }
    ```

13. **Поиск транзакций до определенной даты**

    Эта функция находит транзакции, совершенные до указанной даты.

    ```javascript
    function getTransactionsBeforeDate(transactions, date) {
      const targetDate = new Date(date);
      return transactions.filter(transaction => new Date(transaction.transaction_date) < targetDate);
    }
    ```

14. **Поиск транзакции по идентификатору**

    Эта функция находит транзакцию по ее идентификатору.

    ```javascript
    function findTransactionById(transactions, id) {
      return transactions.find(transaction => transaction.transaction_id === id);
    }
    ```

15. **Получение всех описаний транзакций**

    Эта функция возвращает массив описаний всех транзакций.

    ```javascript
    function mapTransactionDescriptions(transactions) {
      return transactions.map(transaction => transaction.transaction_description);
    }
    ```

## Шаг 3: Тестирование функций

Для того чтобы убедиться, что все функции работают корректно, мы создаем массив транзакций и тестируем все реализованные функции. Результаты тестирования выводятся в консоль, чтобы можно было проверить правильность работы каждой функции.

### Пример массива транзакций

```javascript
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
```

### Тестирование каждой функции

1. **Получение уникальных типов транзакций**

   ```javascript
   console.log('Уникальные типы транзакций:', getUniqueTransactionTypes(transactions));
   ```

2. **Общая сумма транзакций**

   ```javascript
   console.log('Общая сумма транзакций:', calculateTotalAmount(transactions));
   ```

3. **Общая сумма за конкретную дату (2025-03-01)**

   ```javascript
   console.log('Общая сумма за 2025-03-01:', calculateTotalAmountByDate(transactions, 2025, 3, 1));
   ```

4. **Дебетовые транзакции**

   ```javascript
   console.log('Дебетовые транзакции:', getTransactionByType(transactions, 'debit'));
   ```

5. **Транзакции в диапазоне дат**

   ```javascript
   console.log('Транзакции в диапазоне дат:', getTransactionsInDateRange(transactions, '2025-03-01', '2025-03-02'));
   ```

6. **Транзакции с магазином Лента**

   ```javascript
   console.log('Транзакции в магазине Лента:', getTransactionsByMerchant(transactions, 'Лента'));
   ```

7. **Средняя сумма транзакций**

   ```javascript
   console.log('Средняя сумма транзакций:', calculateAverageTransactionAmount(transactions));
   ```

8. **Транзакции в диапазоне сумм**

   ```javascript
   console.log('Транзакции в диапазоне сумм:', getTransactionsByAmountRange(transactions, 100, 500));
   ```

9. **Сумма дебетовых транзакций**

   ```javascript
   console.log('Сумма дебетовых транзакций:', calculateTotalDebitAmount(transactions));
   ```

10. **Месяц с наибольшим количеством транзакций**

    ```javascript
    console.log('Месяц с наибольшим количеством транзакций:', findMostTransactionsMonth(transactions));
    ```

11. **Месяц с наибольшим количеством дебетовых транзакций**

    ```javascript
    console.log('Месяц с наибольшими дебетовыми транзакциями:', findMostDebitTransactionMonth(transactions));
    ```

12. **Наиболее распространенный тип транзакции**

    ```javascript
    console.log('Наиболее распространенный тип транзакции:', mostTransactionTypes(transactions));
    ```

13. **Транзакции до определенной даты**

    ```javascript
    console.log('Транзакции до 2025-03-02:', getTransactionsBeforeDate(transactions, '2025-03-02'));
    ```

14. **Поиск транзакции по ID**

    ```javascript
    console.log('Транзакция с ID 2:', findTransactionById(transactions, '2'));
    ```

15. **Получение описаний транзакций**

    ```javascript
    console.log('Описания транзакций:', mapTransactionDescriptions(transactions));
    ```

## Заключение

В ходе выполнения лабораторной работы были изучены основы работы с массивами, функциями и объектами в JavaScript. Реализованные функции позволяют проводить анализ транзакций по различным критериям: по типу, по сумме, по дате, по магазину и многим другим параметрам. Тестирование показало, что все функции работают корректно как с обычными массивами, так и с крайними случаями, например, с пустыми массивами или массивами с одной транзакцией.
``` 

