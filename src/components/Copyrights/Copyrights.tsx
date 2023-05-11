import './Copyrights.css';

export function Copyrights() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let currentDate = `${day}-${month + 1}-${year}`;

  return (
    <div className="copyrights">
      <div className="copyrights-text">
        <p>Wszelkie prawa zastrzeżone {year}</p>
      </div>{' '}
      <div className="copyrights-date">
        <p>Dzisiaj jest {currentDate}</p>
      </div>
    </div>
  );
}
