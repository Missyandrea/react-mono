import styled from 'tailwind';

const StyledReceipts = styled.div`
  color: pink;
`;

export function Receipts() {
  return (
    <StyledReceipts>
      <h1>Welcome to Receipts!</h1>
    </StyledReceipts>
  );
}

export default Receipts;
