export function msToMS(ms) {
    const M = Math.floor(ms / 60000);
    const S = ((ms % 60000) / 1000).toFixed(0);
    return S == 60 ? M + 1 + ':00' : M + ':' + (S<10? '0' : '') + S;
}