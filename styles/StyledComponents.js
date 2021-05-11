import styled from "styled-components"

const Nav = styled.div`
  width: 100%;
  height: 73px;
  display: flex;
  background-color: #3f3f3f;
  margin: 0 0 261px;
  opacity: 0.72;
  justify-content: space-around;
  align-items: center;
  color: white;
  ul {
    list-style: none;
    display: flex;
    li {
      margin-left: 10px;
    }
  }
  position: sticky;
`

const SignInButton = styled.button`
  width: 101px;
  height: 30px;
  border-radius: 4px;
  border: solid 1px #ffffff;
  margin-left: 30px;
  background-color: transparent;
  color: white;
`

const MenuItems = styled.div`
  display: flex;
  align-items: center;
`

const SearchButton = styled.button`
  width: 134px;
  height: 56px;
  /* margin: 0 0 0 545px; */
  padding: 17px 41px 17px 42px;
  background-color: #00bbd8;
  cursor: pointer;
  border: 0;
  ::focus {
    border: 0;
    outline: none;
  }
  position: relative;
  border-radius: 0px 5px 5px 0px;
`

const MyFilters = styled.div`
  background-color: white;
  width: 100%;
  height: auto;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 5px 0px;
`
const Select = styled.select`
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #c7c7c7;
  height: 37px;
  color: #7b7b7b;
`

const SearchCity = styled.input`
  width: 425px;
  height: 37px;
  border-radius: 3px;
  border: 1px solid #c7c7c7;
  text-indent: 28px;
  color: #707070;
  overflow: visible;
`

const SearchFilters = styled.button`
  border-radius: 5px;
  background-color: #00bbd8;
  color: #fff;
  padding: 0.375rem 0.75rem;
`

const MoreMenuFilters = styled.button`
  border-radius: 5px;
  background-color: #fff;
  color: #00bbd8;
  border: 1px solid #00bbd8;
  max-width: 398px;
  padding: 0.375rem 0.75rem;
  width: max-content;
`

export {
  MenuItems,
  Nav,
  SearchButton,
  SignInButton,
  MoreMenuFilters,
  MyFilters,
  SearchCity,
  SearchFilters,
  Select
}
