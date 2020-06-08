let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";
console.info(pets); // Set { 'Cat', 'Dog', 'Hamster', species: 'mammals' }

for (let pet in pets ){ // get a key, but not index
    console.info(pet); // only species
}
for (let pet of pets ){ // get only values, except the key-value pair
    console.info(pet); // only Cat, Dog, Hamster
}
