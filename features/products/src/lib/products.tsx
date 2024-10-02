import styled from 'tailwind';

const StyledProducts = styled.div`
  color: pink;
`;

export function Products() {
  return (
    <StyledProducts>
      <h1>Welcome to Products!</h1>
    </StyledProducts>
  );
}

export default Products;
