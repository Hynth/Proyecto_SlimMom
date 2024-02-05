import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import 'react-datetime/css/react-datetime.css';
import logoDesk from '../../images/logo-desk.svg';
import leavesImage from '../../images/Laves-calculator-desk.png';
import styles from './DiaryTable.module.css';

const DiaryTable = () => {
  const [activeLabel, setActiveLabel] = useState(null);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
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

  const handleProductSelect = product => {
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

  const handleInputChange = labelFor => {
    setActiveLabel(labelFor);
  };

  const resetActiveLabel = () => {
    setActiveLabel(null);
  };

  const handlePageChange = page => {
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

      setTotalConsumed(prevTotal => prevTotal + calculatedData);
    }
  };

  const handleSearch = event => {
    const term = event.target.value.toLowerCase().trim();
    setSelectedFoodToAdd(null);
    setShowGramsInput(false);

    setSearchTerm(term);

    const filteredProducts = term
      ? allProducts.filter(product =>
          product.title.toLowerCase().includes(term)
        )
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useReactTable({
      columns,
      data: selectedFoods,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });

  return (
    <>
      <div className={styles.container}>
        <div>
          {selectedFoods.length > 0 && (
            <div>
              <table className={styles.table}>
                <tbody>
                  {selectedFoods.map((food, index) => (
                    <tr key={index}>
                      {columns.map(column => (
                        <td key={column.Header}>{food[column.accessor]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <span className={styles['fecha-Hoy']}>{currentDate}</span>
          <div className={styles['search-and-grams']}>
            <div className={styles['search-container']}>
              <input
                className={styles['input-search']}
                type="text"
                placeholder={
                  selectedProduct
                    ? selectedProduct.title
                    : 'Ingresa el producto'
                }
                value={searchTerm}
                onChange={handleSearch}
                style={{ whiteSpace: 'pre-line' }}
              />
              {searchTerm && matchingProducts.length > 0 && (
                <div className={styles['input-search-container']}>
                  <ul>
                    {matchingProducts.map((product, index) => (
                      <li
                        key={index}
                        onClick={() => handleProductSelect(product)}
                      >
                        {product.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles['add-grams-container']}>
              <input
                type="text"
                placeholder={grams === 0 ? 'Gramos' : ''}
                value={grams === 0 ? '' : grams}
                onChange={e => setGrams(e.target.value)}
                className={styles['barra-gramos']}
              />
              <button onClick={handleAddRow} className={styles['add-button']}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bloque2}>
        <p className={styles.userName}>Nic</p>
        <button className={styles['boton-salir']}>Salir</button>
        <div className={styles.resumen}>
          <h2>
            Resumen para el <span id="fechaHoy">{currentDate}</span>
          </h2>
          <div className={styles['resumen-item']}>
            <p>Consumido</p>
            <p className={styles.valor}>
              {totalConsumed.toFixed(2) / 1000} Kcal
            </p>
          </div>
          <div className={styles['resumen-item']}>
            <p>Daily Rate</p>
            <p className={styles.valor}>000 Kcal</p>
          </div>
          <div className={styles['resumen-item']}>
            <p>n% de lo normal</p>
            <p className={styles.valor}>000 Kcal</p>
          </div>
        </div>

        <h2 className={styles.alimentos}>Alimentos no recomendados</h2>
        <p className={styles.dieta}>Tu dieta se mostrará aquí</p>
        <img src={leavesImage} alt="Logo" className={styles.leaves} />
      </div>
    </>
  );
};

export default DiaryTable;
