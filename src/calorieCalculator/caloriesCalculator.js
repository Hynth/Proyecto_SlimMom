import React, { useState, useEffect } from 'react';
import {useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel} from '@tanstack/react-table';
import 'react-datetime/css/react-datetime.css';
import logoDesk from '../images/logo-desk.svg';
import leavesImage from '../images/Laves-calculator-desk.png';
import '../css/stylesCalories.css';

const CaloriesCalculator = () => {
  const [activeLabel, setActiveLabel] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [currentPage, setCurrentPage] = useState('diario');
  const [grams, setGrams] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedFoodToAdd, setSelectedFoodToAdd] = useState(null);
  const [showGramsInput, setShowGramsInput] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalConsumed, setTotalConsumed] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/productos.json');
        const data = await response.json();
        if (Array.isArray(data)) {
          setMatchingProducts(data);
          setAllProducts(data);
        } else {
          console.error('El archivo JSON debe ser un array de objetos.');
        }
      } catch (error) {
        console.error('Error al cargar o procesar el archivo JSON', error);
      }
    };

    fetchData();
  }, []);


  const handleProductSelect = (product) => {
    setSelectedFoodToAdd({
      title: product.title,
      grams: 0,
      calculatedData: 0,
      calories: product.calories,
    });

    setSelectedProduct(product);
    setShowGramsInput(true);
    setMatchingProducts(allProducts);
    setSearchTerm('');
  };

  const handleInputChange = (labelFor) => {
    setActiveLabel(labelFor);
  };

  const resetActiveLabel = () => {
    setActiveLabel(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddRow = () => {
    if (selectedFoodToAdd) {
      const gramsInput = parseFloat(grams) || 0;
      const calculatedData = gramsInput * selectedFoodToAdd.calories;

      const newRow = {
        title: selectedFoodToAdd.title,
        grams: gramsInput,
        calculatedData: calculatedData,
      };

      setSelectedFoods([...selectedFoods, newRow]);
      setGrams(0);
      setSearchTerm('');
      setShowGramsInput(false);
      setSelectedFoodToAdd(null);

      setTotalConsumed((prevTotal) => prevTotal + calculatedData);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase().trim();
    setSelectedFoodToAdd(null);
    setShowGramsInput(false);

    setSearchTerm(term);

    const filteredProducts = term
      ? allProducts.filter((product) => product.title.toLowerCase().includes(term))
      : allProducts;

    const limitedResults = filteredProducts.slice(0, 10);
    setMatchingProducts(term !== '' ? limitedResults : allProducts);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Alimento',
        accessor: 'title',
      },
      {
        Header: 'Gramos',
        accessor: 'grams',
      },
      {
        Header: 'Calculated Data',
        accessor: 'calculatedData',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useReactTable({
    columns,
    data: selectedFoods,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="container">
        <img src={logoDesk} alt="Logo" className="logo" />
        <div className="linea"></div>
        <div className="buttons-container">
          <button
            className={`diario page-button ${currentPage === 'diario' ? 'active' : ''}`}
            onClick={() => handlePageChange('diario')}
          >
            DIARIO
          </button>
          <button
            className={`calculadora page-button ${currentPage === 'calculadora' ? 'active' : ''}`}
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
            <h1>Calcula tu ingesta diaria de calorías ahora mismo</h1>
            <form className="formulario">
              <div className="columna">
                <label
                  htmlFor="altura"
                  className={`formulario-label ${activeLabel === 'altura' ? 'formulario-label-clicked' : ''}`}
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
                  className={`formulario-label ${activeLabel === 'edad' ? 'formulario-label-clicked' : ''}`}
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
                  className={`formulario-label ${activeLabel === 'pesoActual' ? 'formulario-label-clicked' : ''}`}
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
                  className={`formulario-label ${activeLabel === 'pesoDeseado' ? 'formulario-label-clicked' : ''}`}
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
          </>
        )}

        {currentPage === 'calculadora' && (
          <div>
            {selectedFoods.length > 0 && (
              <div>
                <table className="table">
                  <tbody>
                    {selectedFoods.map((food, index) => (
                      <tr key={index}>
                        {columns.map((column) => (
                          <td key={column.Header}>{food[column.accessor]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <span className="fecha-Hoy">{currentDate}</span>
            <div className="search-and-grams">
              <div className="search-container">
                <input
                  className='input-search'
                  type="text"
                  placeholder={selectedProduct ? selectedProduct.title : "Ingresa el producto"}
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{ whiteSpace: 'pre-line' }}
                />
                {searchTerm && matchingProducts.length > 0 && (
                  <div className="input-search-container">
                    <ul>
                      {matchingProducts.map((product, index) => (
                        <li key={index} onClick={() => handleProductSelect(product)}>
                          {product.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="add-grams-container">
                <input
                  type="text"
                  placeholder={grams === 0 ? "Gramos" : ""}
                  value={grams === 0 ? "" : grams}
                  onChange={(e) => setGrams(e.target.value)}
                  className='barra-gramos'
                />
                <button onClick={handleAddRow} className='add-button'>+</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bloque2">
        <p className="userName">Nic</p>
        <button className="boton-salir">Salir</button>
        <div className="resumen">
          <h2>Resumen para el <span id="fechaHoy">{currentDate}</span></h2>
          <div className="resumen-item">
            <p>Consumido</p>
            <p className="valor">{totalConsumed.toFixed(2)/1000} Kcal</p>
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
        <img src={leavesImage} alt="Logo" className="leaves" />
      </div>
    </>
  );
};

export default CaloriesCalculator;
