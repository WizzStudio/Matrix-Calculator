import * as math from 'mathjs'
function add(...arg){return math.add(...arg)}
function multiply(...arg){return math.multiply(...arg)}
function inv(arg){return math.inv(arg)}
function det(mx){return math.det(mx)}
function subtract(...arg){return math.subtract(...arg)}
function transpose(...arg){return math.transpose(...arg)}
function rref(Arr,b,N){
    let max_val_index = 0;
    let effectd = 0.0;
    for(let i=0; i<N; i++){
        max_val_index = i;
        for(let row_i=i+1; row_i<N; row_i++){
            if (Arr[row_i][i] > Arr[max_val_index][i]){
                max_val_index = row_i;
            }
        }
        let temp = 0.0;
        for(let col_i=i; col_i<N; col_i++){
            temp = Arr[max_val_index][col_i];
            Arr[max_val_index][col_i] = Arr[i][col_i];
            Arr[i][col_i] = temp;
        }
        
        temp = b[max_val_index];
        b[max_val_index] = b[i];
        b[i] = temp;
        
        for(let row_i=i+1; row_i<N; row_i++){
            effectd = Arr[row_i][i] / Arr[i][i];
            for(let col_i=i; col_i<N; col_i++){
                Arr[row_i][col_i] -= effectd * Arr[i][col_i];
            }
            b[row_i] -= b[i] * effectd;
        }
        
    }
    // 置0
    for(let i=N-1;i>0;i--){
        for(let row_i=0; row_i<i; row_i++){
            if(!Arr[i][N-1]) continue;
            effectd = Arr[row_i][N-1] / Arr[i][N-1];
            Arr[row_i][N-1] -= effectd * Arr[i][N-1];
            b[row_i] -= b[i] * effectd;
        }
    }
    // 置1
    for(let i=0;i<N;i++){
        for(let row_i=0; row_i<N; row_i++){
            if(Arr[row_i][row_i]){
                effectd = Arr[row_i][row_i];
                Arr[row_i][i] = Arr[row_i][i]/effectd;
                b[row_i] = b[row_i]/effectd;
            }
        }
    }
    console.log("ARR",Arr)
    return Arr
}
export {
    add,
    multiply,
    det,
    subtract,
    transpose,
    inv,
    rref,
}