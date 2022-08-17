import { useState } from 'react';
import { getSortType } from '../../store/selected-sort/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortType } from '../../store/selected-sort/selected-sort';
import { SORT_TYPES } from '../../const';

function SortOffers(): JSX.Element {
  const [activeClass, setActiveClass] = useState<string>('');
  const currentSortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();

  const toggleActiveClass = () => {
    if (activeClass) {
      setActiveClass('');
    } else {
      setActiveClass('places__options--opened');
    }
  };

  document.addEventListener('click', (evt) => {
    const evtTarget = evt.target as HTMLElement;
    if (evtTarget.className !== 'places__sorting-type' &&
        evtTarget.className !== 'places__option' &&
        activeClass === 'places__options--opened') {
      toggleActiveClass();
    }
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={toggleActiveClass} className="places__sorting-type" tabIndex={0}>
        {`${currentSortType}`}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${activeClass}`}>
        {SORT_TYPES.map((sortType) => (
          <li
            onClick={(evt) => {
              toggleActiveClass();
              dispatch(changeSortType(evt.currentTarget.textContent));
            }}
            className={`places__option ${currentSortType === sortType ? 'places__option--active' : ''}`}
            key={sortType}
            tabIndex={0}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOffers;
