import styled from "styled-components";

export const BannerImageStyled = styled.div`
  background-image: url(/login-image.svg);
  background-size: cover;
    height: 100vh;
    width: 50vw;
`;
function BannerImage() {
  return (
    <>
      <BannerImageStyled />
    </>
  );
}
export default BannerImage;