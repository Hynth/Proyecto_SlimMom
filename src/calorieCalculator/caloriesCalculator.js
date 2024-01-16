import React, { useState, useEffect } from 'react';
import { FoodDatabaseClient } from 'edamam-api';
import '../css/stylesCalories.css';
import 'react-datetime/css/react-datetime.css';

const CaloriesCalculator = () => {
  const [activeLabel, setActiveLabel] = useState(null);
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

  const handleInputChange = labelFor => {
    setActiveLabel(labelFor);
  };

  const resetActiveLabel = () => {
    setActiveLabel(null);
  };

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
        <div className="logo"></div>
        <div className="icon-hamburger"></div>
        <div className="line-header"></div>
        <div className="linea"></div>
        <div className="linea2"></div>
        <div className="buttons-container">
          <button
            className={`diario page-button ${
              currentPage === 'diario' ? 'active' : ''
            }`}
            onClick={() => handlePageChange('diario')}
          >
            DIARIO
          </button>
          <button
            className={`calculadora page-button ${
              currentPage === 'calculadora' ? 'active' : ''
            }`}
            onClick={() => handlePageChange('calculadora')}
          >
            CALCULADORA
          </button>
        </div>

        {currentPage === 'diario' && (
          <>
            <button
              className="boton-comienza"
              onClick={() => handlePageChange('calculadora')}
            >
              Comienza a perder peso
            </button>
            <h1 className="text__title">
              Calcula tu ingesta diaria de calorías ahora mismo
            </h1>
            <form className="formulario">
              <div className="columna">
                <label
                  htmlFor="altura"
                  className={`formulario-label ${
                    activeLabel === 'altura' ? 'formulario-label-clicked' : ''
                  }`}
                  onClick={() => handleInputChange('altura')}
                >
                  Altura*
                </label>
                <input
                  type="text"
                  id="altura"
                  name="altura"
                  className="formulario-input"
                  onClick={() => handleInputChange('altura')}
                  onBlur={resetActiveLabel}
                />

                <label
                  htmlFor="edad"
                  className={`formulario-label ${
                    activeLabel === 'edad' ? 'formulario-label-clicked' : ''
                  }`}
                  onClick={() => handleInputChange('edad')}
                >
                  Edad*
                </label>
                <input
                  type="text"
                  id="edad"
                  name="edad"
                  className="formulario-input"
                  onClick={() => handleInputChange('edad')}
                  onBlur={resetActiveLabel}
                />

                <label
                  htmlFor="pesoActual"
                  className={`formulario-label ${
                    activeLabel === 'pesoActual'
                      ? 'formulario-label-clicked'
                      : ''
                  }`}
                  onClick={() => handleInputChange('pesoActual')}
                >
                  Peso actual*
                </label>
                <input
                  type="text"
                  id="pesoActual"
                  name="pesoActual"
                  className="formulario-input"
                  onClick={() => handleInputChange('pesoActual')}
                  onBlur={resetActiveLabel}
                />
              </div>

              <div className="columna">
                <label
                  htmlFor="pesoDeseado"
                  className={`formulario-label ${
                    activeLabel === 'pesoDeseado'
                      ? 'formulario-label-clicked'
                      : ''
                  }`}
                  onClick={() => handleInputChange('pesoDeseado')}
                >
                  Peso deseado*
                </label>
                <input
                  type="text"
                  id="pesoDeseado"
                  name="pesoDeseado"
                  className="formulario-input"
                  onClick={() => handleInputChange('pesoDeseado')}
                  onBlur={resetActiveLabel}
                />

                <label className="formulario-label">Grupo sanguíneo*</label>
                <div className="grupoSanguineo-options">
                  <input
                    type="radio"
                    id="grupo1"
                    name="grupoSanguineo"
                    value="1"
                  />
                  <label htmlFor="grupo1">1</label>

                  <input
                    type="radio"
                    id="grupo2"
                    name="grupoSanguineo"
                    value="2"
                  />
                  <label htmlFor="grupo2">2</label>

                  <input
                    type="radio"
                    id="grupo3"
                    name="grupoSanguineo"
                    value="3"
                  />
                  <label htmlFor="grupo3">3</label>

                  <input
                    type="radio"
                    id="grupo4"
                    name="grupoSanguineo"
                    value="4"
                  />
                  <label htmlFor="grupo4">4</label>
                </div>
              </div>
            </form>

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

      <div className="bloque2">
        <p className="userName">Nic</p>
        <button className="boton-salir">Salir</button>

        <div className="resumen">
          <h2>
            Resumen para el <span id="fechaHoy">{currentDate}</span>
          </h2>
          <div className="resumen-item">
            <p>Consumido</p>
            <p className="valor">000 Kcal</p>
          </div>
          <div className="resumen-item">
            <p>Daily Rate</p>
            <p className="valor">000 Kcal</p>
          </div>
          <div className="resumen-item">
            <p>n% de lo normal</p>
            <p className="valor">000 Kcal</p>
          </div>
        </div>

        <h2 className="alimentos">Alimentos no recomendados</h2>
        <p className="dieta">Tu dieta se mostrará aquí</p>
        {/* <img src={leavesImage} alt="Logo" className="leaves" /> */}
      </div>
    </>
  );
};

export default CaloriesCalculator;
