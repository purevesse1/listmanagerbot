import { describe, expect, test } from '@jest/globals'

type Gender = 'male' | 'female'
const CONSENT_AGE = 18

interface IAgedEntity {
  age: number
}

interface IPerson extends IAgedEntity {
  gender?: Gender
}

describe('Classes tests', () => {
  test('sample 1', function() {
    const obj = {
      name: 'xd',
      age: 15,
      gender: 'ma',
      disabled: false,
      amIAdult() {
        return this.age >= CONSENT_AGE
      },
    }
    expect(obj.amIAdult()).toBe(false)
  })
  test('sample 2', () => {
    const obj = {
      age: 19,
      isAdult: isAdultRoot,
    }
    const obj2 = {
      age: 11,
    }
    expect(obj.isAdult()).toBe(true)
    expect(isAdultFn.call(obj2, 10)).toBe(true)
    expect(obj.isAdult.call(obj2)).toBe(false)
  })
  test('sample 3', () => {
    const person = new Person('b', 5)
    expect(person.isAdult()).toBe(false)
    person.age = 18
    expect(person.isAdult()).toBe(true)
  })
  test('sample 4', () => {
    const person = new Person({ age: 50 })
    expect(person.isAdult(100)).toBe(false)
  })
  test('sample 5', async () => {
    const person = new Person({ age: 50 })
    expect(person.getHistory().length).toBe(1)
    person.disable()
    expect(person.isDisabled()).toBe(true)
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
    person.enable()
    expect(person.isDisabled()).toBe(false)
    expect(person.getHistory().length).toBe(3)
    console.log(person.getHistory())
  })
  test('sample gender change', () => {
    const person = new Person({ age: 50, gender: 'female' })
    person.changeGender('male')
    expect(person.getHistory().length).toBe(2)
  })
  test('sample gender change forbidden', () => {
    const person = new Person({ age: 5, gender: 'female' })
    const changeToMale = () => {
      person.changeGender('male')
    }
    expect(changeToMale).toThrow('Gender change is prohibited to minors')
  })
  test('sample gender change forbidden long syntax', () => {
    const person = new Person({ age: 5, gender: 'female' })
    try {
      person.changeGender('male')
      expect('Not success').toBe('Success')
    } catch (e: any) {
      expect((e as Error).message).toBe('Gender change is prohibited to minors')
    }
  })
  test('promise test', () => {
    type fn = (param: any) => void
    const executor = (resolve: fn, reject: fn) => {
      reject('test')
    }
    const promise = new Promise(executor)
    expect(promise).rejects.toEqual('test')
  })
})

class Person implements IAgedEntity {
  name: string
  private gender?: Gender
  private disabled: boolean
  private stateHistory: {
    date: Date,
    disabled: boolean
    gender?: Gender
  }[] = []
  age: number

  isAdult(): boolean
  isAdult(minAge: number): boolean
  isAdult(minAge: number = CONSENT_AGE) {
    return this.age >= minAge
  }

  constructor(person: IPerson)
  constructor(name: string, age: number)
  constructor(nameOrPerson: string | IPerson, age?: number) {
    if (typeof nameOrPerson === 'string') {
      this.name = nameOrPerson
      this.age = age || 0
    } else {
      this.name = ''
      this.age = nameOrPerson.age
      this.gender = nameOrPerson.gender
    }
    this.disabled = false
    this.pushHistory()
  }

  isDisabled() {
    return this.disabled
  }

  disable() {
    this.disabled = true
    this.pushHistory()
  }

  enable() {
    this.disabled = false
    this.pushHistory()
  }

  getHistory() {
    return this.stateHistory.map(h => {
      return { ...h }
    })
  }

  private pushHistory() {
    this.stateHistory.push({
      date: new Date(),
      disabled: this.disabled,
      gender: this.gender,
    })
  }

  changeGender(to: Gender) {
    if (!this.isAdult()) {
      throw new Error('Gender change is prohibited to minors')
    }
    this.gender = to
    this.pushHistory()
  }
}

class Company implements IAgedEntity {
  age: number = 0
}

function logAge(entity: Person | Company) {
  console.log(entity.age)
}

function isAdultRoot(this: IAgedEntity) {
  return isAdultFn.call(this, CONSENT_AGE)
}


function isAdultFn(this: IAgedEntity, consentAge: number) {
  return this.age >= consentAge
}
