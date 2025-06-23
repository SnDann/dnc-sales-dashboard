import { decodeJWT, isTokenExpired } from './jwt';

describe('JWT Utility Functions', () => {
  // Generated with header {"alg":"none"} and payload {"sub":"1234567890","name":"John Doe","iat":1516239022}
  const testToken = 'eyJhbGciOiJub25lIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.';
  // Expired token with exp in the past
  const expiredPayload = { exp: Math.floor(Date.now() / 1000) - 1000 };
  const expiredToken = `e30.${btoa(JSON.stringify(expiredPayload))}.`;
  // Valid token with future exp
  const validPayload = { exp: Math.floor(Date.now() / 1000) + 1000 };
  const validToken = `e30.${btoa(JSON.stringify(validPayload))}.`;

  test('decodeJWT returns null for malformed token', () => {
    expect(decodeJWT('invalid.token')).toBeNull();
  });

  test('decodeJWT decodes valid payload correctly', () => {
    const decoded = decodeJWT<{ sub: string; name: string }>(testToken);
    expect(decoded).toEqual({ sub: '1234567890', name: 'John Doe', iat: 1516239022 });
  });

  test('isTokenExpired returns true for expired token', () => {
    expect(isTokenExpired(expiredToken)).toBe(true);
  });

  test('isTokenExpired returns false for valid token', () => {
    expect(isTokenExpired(validToken)).toBe(false);
  });
});
