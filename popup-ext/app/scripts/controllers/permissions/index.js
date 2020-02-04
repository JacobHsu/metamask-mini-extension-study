// some constants
const WALLET_METHOD_PREFIX = 'wallet_'
export function addInternalMethodPrefix (method) {
    return WALLET_METHOD_PREFIX + method
}