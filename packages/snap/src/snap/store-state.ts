

export type SecureState = {
    sk: string
}

export const getSecureState = async (): Promise<SecureState> => {
    return (await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
    })) as SecureState;

}