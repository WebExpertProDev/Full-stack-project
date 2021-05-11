import styled from "styled-components"

const MenuContainer = styled.div`
  background-color: #efefef;
  animation-name: fadeInUp;
`

const Menu = styled.div`
  display: flex;
  list-style-type: none;
  li {
    margin-left: 5px;
    margin-right: 5px;
  }
`

export { Menu, MenuContainer }
