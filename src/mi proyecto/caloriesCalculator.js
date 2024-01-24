import React, { useState, useEffect } from 'react';
import { FoodDatabaseClient } from 'edamam-api';
import '../css/stylesCalories.css';
import 'react-datetime/css/react-datetime.css';

const CaloriesCalculator = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentPage, setCurrentPage] = useState('diario');
  const [foodList, setFoodList] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [grams, setGrams] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString());
  }, []);

	const handlePageChange = page => {
		setCurrentPage(page);
	};

  const client = new FoodDatabaseClient({
    appId: 'c1e98509',
    appKey: '95e35ffe56125b87c53b65c5748a4314',
  });

  const searchFoodEdamam = async query => {
    try {
      const response = await fetch(`/api/food?q=${query}`);
      const data = await response.json();

      console.log(data);
      // Asegúrate de que data tiene la estructura esperada desde tu servidor
      setFoodList(data);
    } catch (error) {
      console.error('Error al buscar alimentos en Edamam:', error);
    }
  };

  const handleFoodSelect = food => {
    setSelectedFood(food);
    setCalories(food.nutrients.ENERC_KCAL * (grams / 100));
  };

  return (
    <>
      <div className="container">
				{/* <Header/> */}
        {currentPage === 'diario' && (
          <>
						{/* <CalculatorForm/> */}

            <div>
              <input
                className="input-none"
                type="text"
                placeholder="Buscar"
                onChange={e => searchFoodEdamam(e.target.value)}
              />
              <ul>
                {foodList.map(food => (
                  <li key={food.foodId} onClick={() => handleFoodSelect(food)}>
                    {food.label}
                  </li>
                ))}
              </ul>
              {selectedFood && (
                <div>
                  <input
                    type="number"
                    value={grams}
                    onChange={e => {
                      setGrams(e.target.value);
                      setCalories(
                        selectedFood.nutrients.ENERC_KCAL *
                          (e.target.value / 100)
                      );
                    }}
                  />
                  <p>{`Calorías: ${calories}`}</p>
                </div>
              )}
            </div>
          </>
        )}

        {currentPage === 'calculadora' && (
          <div className="blank-form-container">
            <p>Contenido de la calculadora</p>
          </div>
        )}
      </div>
			{/* <DietInfo/> */}
    </>
  );
};

export default CaloriesCalculator;
