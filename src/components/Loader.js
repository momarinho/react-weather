export default function Loader() {
  return (
    <body class="bg-gray-300">
      <div class="preloader flex justify-center items-center h-screen">
        <svg
          viewBox="0 0 102 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16"
        >
          <path
            class="big-circle stroke-current stroke-2"
            d="M101 51C101 78.6142 78.6142 101 51 101C23.3858 101 1 78.6142 1 51"
          />
          <path
            class="small-circle stroke-current stroke-2"
            d="M91 51C91 28.9086 73.0914 11 51 11C28.9086 11 11 28.9086 11 51"
          />
        </svg>
      </div>
    </body>
  );
}
