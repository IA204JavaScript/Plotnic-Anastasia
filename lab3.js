// Функция-конструктор для создания предметов
function Item(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }
  
  // Метод для получения информации о предмете
  Item.prototype.getInfo = function() {
    return `Название: ${this.name}, Вес: ${this.weight} кг, Редкость: ${this.rarity}`;
  };
  
  // Метод для установки нового веса предмета
  Item.prototype.setWeight = function(newWeight) {
    this.weight = newWeight;
  };
  
  // Функция-конструктор для создания оружия, расширяет Item
  function Weapon(name, weight, rarity, damage, durability) {
    Item.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }
  
  // Наследование методов от Item
  Weapon.prototype = Object.create(Item.prototype);
  Weapon.prototype.constructor = Weapon;
  
  // Метод для использования оружия: уменьшает прочность на 10, если она больше 0
  Weapon.prototype.use = function() {
    if (this.durability > 0) {
      this.durability -= 10;
      console.log(`${this.name} использовано. Прочность теперь: ${this.durability}`);
    } else {
      console.log(`${this.name} сломано и не может быть использовано.`);
    }
  };
  
  // Метод для восстановления прочности оружия до 100
  Weapon.prototype.repair = function() {
    this.durability = 100;
    console.log(`${this.name} отремонтировано.`);
  };
  
  // Пример использования
  const sword = new Item("Steel Sword", 3.5, "rare");
  console.log(sword.getInfo());
  sword.setWeight(4.0);
  console.log(sword.getInfo());
  
  const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
  console.log(bow.getInfo());
  bow.use();
  bow.use();
  console.log(`Текущая прочность: ${bow.durability}`);
  bow.repair();
  console.log(`Текущая прочность после ремонта: ${bow.durability}`);
  