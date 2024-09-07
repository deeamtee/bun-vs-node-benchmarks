function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function findPrimes(limit: number) {
    const primes = [];
    for (let i = 0; i < limit; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

function factorial(n: number): number {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

function calculateFactorials(limit: number) {
    const factorials = [];
    for (let i = 0; i <= limit; i++) {
        factorials.push(factorial(i));
    }
    return factorials;
}

function processData(data: any[]) {
    return data.map((x: number) => x * x).filter((x: number) => x % 2 === 0).reduce((acc: any, val: any) => acc + val, 0);
}

function generateData(size: number) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

function sortData(data: any[]) {
    return data.sort((a: number, b: number) => a - b);
}

function main() {
    console.log('Starting complex computations...');

    console.time('findPrimes');
    const primes = findPrimes(100000);
    console.timeEnd('findPrimes');
    console.log('Found primes:', primes.length);

    console.time('calculateFactorials');
    const factorials = calculateFactorials(20);
    console.timeEnd('calculateFactorials');
    console.log('Calculated factorials:', factorials.length);

    console.time('processData');
    const data = generateData(1000000);
    const result = processData(data);
    console.timeEnd('processData');
    console.log('Processed data result:', result);

    console.time('sortData');
    const sortedData = sortData(data);
    console.timeEnd('sortData');
    console.log('Sorted data length:', sortedData.length);

    console.log('Completed complex computations.');
}

main();
