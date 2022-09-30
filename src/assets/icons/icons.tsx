import React from 'react'

interface ISelector {
  className: string;
  id: string;
  onClick?: () => void;
}

export default function IconSelector({ className, id, onClick }: ISelector) {
  switch (id) {
    case 'close':
      return (
        <svg className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_70_2322)">
            <path d="M18.3 5.71C17.91 5.32 17.28 5.32 16.89 5.71L12 10.59L7.10997 5.7C6.71997 5.31 6.08997 5.31 5.69997 5.7C5.30997 6.09 5.30997 6.72 5.69997 7.11L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.11C18.68 6.73 18.68 6.09 18.3 5.71Z" fill="#121720" />
          </g>
          <defs>
            <clipPath id="clip0_70_2322">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    case 'logo':
      return (
        <svg className={`${className}`} width="136" height="28" viewBox="0 0 136 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M31.516 10.5875H22.466C20.4549 1.50477 5.3717 10.5872 9.39389 17.8536C12.4106 21.4867 18.779 20.2756 20.4549 17.8536H30.5104C20.0527 32.3862 6.37725 27.8447 3.36059 25.1199C0.343952 23.3033 -4.88492 8.77087 10.3994 1.50456C25.6838 -3.58186 30.8456 5.44048 31.516 10.5875Z" fill="#121720" />
          <path d="M31.5158 28L36.4011 0H45.1945L40.3092 21.6774H65.7124C71.9655 21.6774 72.2261 16.8602 71.5747 14.4516H69.6206L74.5058 9.93548L80.3681 14.4516H78.414C78.414 24.5677 69.9463 27.6989 65.7124 28H31.5158Z" fill="#121720" />
          <path d="M49.1027 14.4516H51.0567C51.8384 3.6129 61.1529 0.301075 65.7124 0H103.817V6.32258L88.1845 22.5806H100.886L99.909 28H78.414V22.5806L94.0468 7.22581H65.7124C57.1144 7.22581 56.2677 12.043 56.919 14.4516H59.8502L53.9879 18.9677L49.1027 14.4516Z" fill="#121720" />
          <path fillRule="evenodd" clipRule="evenodd" d="M100.11 28L117.188 0H128.929L135.333 28H124.659V23.3333H112.918L109.716 28H100.11ZM116.12 17.7333L121.457 8.4L123.592 17.7333H116.12Z" fill="#121720" />
        </svg>
      )
    case 'east':
      return (
        <svg className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_8_79)">
            <path d="M14.29 5.71001C13.9 6.10001 13.9 6.73001 14.29 7.12001L18.17 11H3C2.45 11 2 11.45 2 12C2 12.55 2.45 13 3 13H18.18L14.3 16.88C13.91 17.27 13.91 17.9 14.3 18.29C14.69 18.68 15.32 18.68 15.71 18.29L21.3 12.7C21.69 12.31 21.69 11.68 21.3 11.29L15.7 5.71001C15.32 5.32001 14.68 5.32001 14.29 5.71001Z" fill="#121720" />
          </g>
          <defs>
            <clipPath id="clip0_8_79">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    case 'heart':
      return (
        <svg onClick={onClick} className={`${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_8_11)">
            <path d="M19.66 3.99001C17.02 2.19001 13.76 3.03001 12 5.09001C10.24 3.03001 6.97997 2.18001 4.33997 3.99001C2.93997 4.95001 2.05997 6.57001 1.99997 8.28001C1.85997 12.16 5.29997 15.27 10.55 20.04L10.65 20.13C11.41 20.82 12.58 20.82 13.34 20.12L13.45 20.02C18.7 15.26 22.13 12.15 22 8.27001C21.94 6.57001 21.06 4.95001 19.66 3.99001ZM12.1 18.55L12 18.65L11.9 18.55C7.13997 14.24 3.99997 11.39 3.99997 8.50001C3.99997 6.50001 5.49997 5.00001 7.49997 5.00001C9.03997 5.00001 10.54 5.99001 11.07 7.36001H12.94C13.46 5.99001 14.96 5.00001 16.5 5.00001C18.5 5.00001 20 6.50001 20 8.50001C20 11.39 16.86 14.24 12.1 18.55Z" fill="#121720" />
          </g>
          <defs>
            <clipPath id="clip0_8_11">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    case 'person':
      return (
        <svg onClick={onClick} className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_70_2247)">
            <path d="M12 5.9C13.16 5.9 14.1 6.84 14.1 8C14.1 9.16 13.16 10.1 12 10.1C10.84 10.1 9.9 9.16 9.9 8C9.9 6.84 10.84 5.9 12 5.9ZM12 14.9C14.97 14.9 18.1 16.36 18.1 17V18.1H5.9V17C5.9 16.36 9.03 14.9 12 14.9ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 13C9.33 13 4 14.34 4 17V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V17C20 14.34 14.67 13 12 13Z" fill="#121720" />
          </g>
          <defs>
            <clipPath id="clip0_70_2247">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    case 'search':
      return (
        <svg onClick={onClick} className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_8_53)">
            <path d="M23.6804 22.1377L16.2421 14.6994C17.4571 13.1535 18.1826 11.2056 18.1826 9.09134C18.1826 4.07833 14.1043 0 9.09127 0C4.07833 0 0 4.07833 0 9.09127C0 14.1042 4.07833 18.1825 9.09127 18.1825C11.2055 18.1825 13.1535 17.4571 14.6993 16.2421L22.1377 23.6804C22.3507 23.8935 22.6299 24 22.9091 24C23.1883 24 23.4675 23.8935 23.6804 23.6804C24.1065 23.2545 24.1065 22.5637 23.6804 22.1377ZM2.18182 9.09127C2.18182 5.28138 5.28138 2.18182 9.09127 2.18182C12.9012 2.18182 16.0008 5.28138 16.0008 9.09127C16.0008 12.9012 12.9012 16.0007 9.09127 16.0007C5.28138 16.0007 2.18182 12.9012 2.18182 9.09127Z" fill="#121720" />
          </g>
          <defs>
            <clipPath id="clip0_8_53">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    case 'inst':
      return (
        <svg onClick={onClick} className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1276 3H7.87244C5.18573 3 3 5.18573 3 7.87244V16.1277C3 18.8143 5.18573 21 7.87244 21H16.1277C18.8143 21 21 18.8143 21 16.1277V7.87244C21 5.18573 18.8143 3 16.1276 3V3ZM12 16.9217C9.2861 16.9217 7.07826 14.7139 7.07826 12C7.07826 9.2861 9.2861 7.07826 12 7.07826C14.7139 7.07826 16.9217 9.2861 16.9217 12C16.9217 14.7139 14.7139 16.9217 12 16.9217ZM17.0394 8.23897C16.2374 8.23897 15.5851 7.58665 15.5851 6.78465C15.5851 5.98265 16.2374 5.3302 17.0394 5.3302C17.8414 5.3302 18.4939 5.98265 18.4939 6.78465C18.4939 7.58665 17.8414 8.23897 17.0394 8.23897Z" fill="#121720" />
          <path d="M12 8.13348C9.86815 8.13348 8.13354 9.86795 8.13354 12C8.13354 14.1319 9.86815 15.8665 12 15.8665C14.1321 15.8665 15.8665 14.1319 15.8665 12C15.8665 9.86795 14.1321 8.13348 12 8.13348Z" fill="#121720" />
        </svg>
      )
    case 'arrowLeft':
      return (
        <svg className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.71 15.88L10.83 12L14.71 8.12001C15.1 7.73001 15.1 7.10001 14.71 6.71001C14.32 6.32001 13.69 6.32001 13.3 6.71001L8.70998 11.3C8.31998 11.69 8.31998 12.32 8.70998 12.71L13.3 17.3C13.69 17.69 14.32 17.69 14.71 17.3C15.09 16.91 15.1 16.27 14.71 15.88Z" fill="#121720" />
        </svg>
      )
    case 'arrowRight':
      return (
        <svg className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.29006 15.88L13.1701 12L9.29006 8.12001C8.90006 7.73001 8.90006 7.10001 9.29006 6.71001C9.68006 6.32001 10.3101 6.32001 10.7001 6.71001L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z" fill="#121720" />
        </svg>
      )
    case 'southEast':
      return (
        <svg className={`${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_8_127)">
            <path d="M18 9C17.44 9 17 9.45 17 10V15.59L6.11998 4.7C5.72998 4.31 5.09998 4.31 4.70998 4.7C4.31998 5.09 4.31998 5.72 4.70998 6.11L15.59 17H9.99998C9.44998 17 8.99998 17.45 8.99998 18C8.99998 18.55 9.44998 19 9.99998 19H18C18.55 19 19 18.55 19 18V10C19 9.45 18.55 9 18 9Z" fill="#121720" />
          </g>
          <defs>
            <clipPath id="clip0_8_127">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    default:
      return (
        <div></div>
      )
  }
}