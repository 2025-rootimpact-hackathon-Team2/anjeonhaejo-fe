const Home = ({ selected = false }) => {
  const color = selected ? '#2567EF' : '#444444';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_172_995)">
        <path 
          d="M9 20C9.55228 20 10 19.5523 10 19V15C10 14.4477 10.4477 14 11 14H13C13.5523 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H18C18.5523 20 19 19.5523 19 19V12.832C19 12.3725 19.3725 12 19.832 12C20.5944 12 20.9552 11.0597 20.3885 10.5497L12.669 3.60207C12.2887 3.25979 11.7113 3.25979 11.331 3.60207L3.6115 10.5497C3.04475 11.0597 3.40557 12 4.16804 12C4.62752 12 5 12.3725 5 12.832V19C5 19.5523 5.44772 20 6 20H9Z" 
          fill={color}
        />
      </g>
      <defs>
      <clipPath id="clip0_172_995">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
}

export default Home;
