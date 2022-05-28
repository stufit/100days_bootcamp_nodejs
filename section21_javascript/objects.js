// class 선언
// 만약 class 를 사용하지 않으면, 객체를 담는 변수를 계속해서 생성해야하는 불편함이 생김
// 예를 들면 job, job2, job3 처럼 같은 객체 폼에다가 값만 바꾸는 상황일 때 불편한 경우가 있음.
// 이럴 때 class 를 선언해주면 훨씬 유용함.

// [1] class 를 사용하지 않는 경우.

// const job = {
//     title: 'Developer',
//     location: 'New York',
//     salary: 5000,
// };

// console.log(new Date().toISOString())

// const job2 = {
//     title: 'Chef',
//     location: 'jangyan',
//     salary: 35000,
// };


// [2] class 를 사용하는 경우

class Job {
    constructor(jobTitle,place,salary){
        this.title = jobTitle;
        this.location = place;
        this.salary = salary;
    }

    // class 안에 함수 선언하여 호출가능.
    describe(){
        console.log(`I'm a ${this.title}, I work in ${this.location} and I earn ${this.salary}. `);
    }
}

const developer = new Job('개발자','장안동','3500');
const chef = new Job('요리사','동대문구',20000);
const samsung = new Job('삼성맨','삼성역',100000000);
console.log(developer);
console.log(chef);
console.log(samsung);
// class 안에 있는 함수 호출
developer.describe();

// [3] : 객체 및 배열의 비구조화

// [3-1] : 배열 또는 객체 선언
const input_array = ['lee','kwanyoung'];
const input_object = {title : '마켓보로', location : '판교'};


const firstName = input_array[0]; // 일반적으로 배열의 요소를 변수선언해주는 방식
const lastName  = input_array[1];
console.log(`일반적인 방법 : ${firstName}`);
console.log(`일반적인 방법 : ${lastName}`);

const [ first, last ] = input_array;  // 배열의 비구조화
console.log(`배열의구조화 방법 : ${first}`);
console.log(`배열의구조화 방법 : ${last}`);

const jobTitle = input_object.title;
const jobLocation = input_object.location;
console.log(`일반적인 방법 : ${jobTitle}`);
console.log(`일반적인 방법 : ${jobLocation}`);

const { title, location } = input_object; // 객체의 비구조화
console.log(`객체의구조화 방법 : ${title}`);
console.log(`객체의구조화 방법 : ${location}`);

const {title:lktitle, location:lklocation} = input_object; // 객체 비구조화 시  key값명을 변경하고 싶을 때
console.log(lktitle);
console.log(lklocation);
