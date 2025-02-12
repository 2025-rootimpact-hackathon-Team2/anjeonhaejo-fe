const Report = ({ selected = false }) => {
  const color = selected ? '#2567EF' : '#444444';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M19.2 3H4.8C3.81 3 3.009 3.81 3.009 4.8L3 21L6.6 17.4H12.9H19.2C20.19 17.4 21 16.59 21 15.6V4.8C21 3.81 20.19 3 19.2 3ZM12.9 13.8H11.1V12H12.9V13.8ZM12.9 10.2H11.1V6.6H12.9V10.2Z" 
        fill={color}
      />
    </svg>
  )
}

export default Report;
