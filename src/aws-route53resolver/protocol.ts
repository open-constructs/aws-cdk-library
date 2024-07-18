/**
 * The protocols you want to use for the endpoint.
 * DoH-FIPS is applicable for inbound endpoints only.
 */
export enum Protocol {
  /**
   * The data is relayed using the Route 53 Resolver without additional encryption.
   * While the data cannot be read by external parties, it can be viewed within the AWS networks.
   */
  DO_53 = 'Do53',
  /**
   * The data is transmitted over an encrypted HTTPS session.
   * DoH adds an added level of security where data can't be decrypted by unauthorized users,
   * and can't be read by anyone except the intended recipient.
   */
  DO_H = 'DoH',
  /**
   * The data is transmitted over an encrypted HTTPS session that is compliant with the FIPS 140-2 cryptographic standard.
   * Supported for inbound endpoints only.
   *
   * @see https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf
   */
  DO_H_FIPS = 'DoH-FIPS',
}
