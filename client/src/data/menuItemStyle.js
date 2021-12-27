const style = `
// @import url("./src/css/index.css");
.d-flex {
  display: flex;
}
.w-100 {
  width: 100%;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.items-center {
  align-items: center;
}
.mr-1 {
  margin-right: 0.25rem;
}
.pl-2 {
  padding-left: 0.5rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-bottom: 0.625rem;
}
.text-gray-500 {
  color: rgb(107, 114, 128);
}
.bg-gray-50 {
  background-color: rgb(249, 250, 251);
}

li {
  display: flex;
}

li button {
  width: 60px;
  line-height: inherit;
  cursor: pointer;
  height: auto;
  border: none;
  outline: none;
  border-radius: 2rem;
}

li button:hover {
  background-color: rgb(229, 231, 235);
}

.sold-out {
  text-decoration: line-through;
  color: gray;
}
`;

export default style;