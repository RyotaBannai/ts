type Value<T> = T extends () => Promise<infer U> ? U : never;
type Fetch<T> = () => Promise<Value<T>>;

async function series<T>(...fetches: Fetch<T>[]) {
    let responses: Value<T>[] = [];
    for (let fetch of fetches) {
        responses.push(await fetch());
    }

    return responses;
}

series<() => Promise<{ data: string; }>>(
    () => Promise.resolve({ ddata: 'first' }), // コンパイルエラー
    () => Promise.resolve({ data: 'second' }),
    () => Promise.resolve({ data: 'third' }),
).then(
    responses => responses.forEach(response => {
        console.log(response.dataa); // コンパイルエラー
    })
);

// https://qiita.com/ringtail003/items/733aff32ddad7d4fda90

export {}