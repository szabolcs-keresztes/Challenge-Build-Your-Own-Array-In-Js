
function calcBiggerLength(oldLength) {
    return Math.pow(oldLength, 2);
}

function extendPlainArraysLength(elements) {
    const newElements = new PlainArray(calcBiggerLength(elements.length));

    for (let i = 0; i < elements.length; ++i) {
        newElements.set(i, elements.get(i));
    }

    return newElements;
}

function MyArray(initialCapacity) {
    if (initialCapacity === undefined || initialCapacity === 0) {
        initialCapacity = 2;
    }

    this.elements = new PlainArray(initialCapacity);
    this.size = 0;
}

MyArray.prototype.length = function () {
    return this.size;
};

MyArray.prototype.push = function (value) {
    if (this.elements.length <= this.size) {
        this.elements = extendPlainArraysLength(this.elements);
    }

    this.elements.set(this.size, value);
    this.size += 1;
};

MyArray.prototype.get = function (index) {
    if (index < 0) return undefined;
    if (index >= this.size) return undefined;
    return this.elements.get(index);
};

MyArray.prototype.set = function (index, value) {
    if (this.elements.length <= index) {
        this.elements = extendPlainArraysLength(this.elements);
        this.set(index, value);
        this.size = index + 1;
        return;
    }
    this.elements.set(index, value);
};

MyArray.of = function (...args) {
    if (args.length == 0) return new MyArray();
    const newArray = new MyArray(args.length);
    args.map(arg => {
        newArray.push(arg);
    })
    return newArray;
};

MyArray.prototype.pop = function () {
    if (this.size === 0) return undefined;
    const element = this.elements.get(this.size - 1);
    this.size -= 1;
    return element;
};

MyArray.prototype.concat = function (other) {
    const result = new MyArray();
    for (let i = 0; i < this.size; ++i) {
        result.push(this.elements.get(i));
    }
    for (let i = 0; i < other.length(); ++i) {
        result.push(other.get(i));
    }
    return result;
};

MyArray.prototype.indexOf = function (element) {
    for (let i = 0; i < this.size; ++i) {
        if (element === this.elements.get(i)) {
            return i;
        }
    }
    return -1;
};

MyArray.prototype.lastIndexOf = function (element) {
    let lastIndexOfElement = -1;
    for (let i = 0; i < this.size; ++i) {
        if (element === this.elements.get(i)) {
            lastIndexOfElement = i;
        }
    }
    return lastIndexOfElement;
};

MyArray.prototype.includes = function (element) {
    for (let i = 0; i < this.size; ++i) {
        if (element === this.elements.get(i)) {
            return true;
        }
    }
    return false;
};

MyArray.prototype.find = function (fn) {
    for (let i = 0; i < this.size; ++i) {
        if (fn(this.elements.get(i))) {
            return this.elements.get(i);
        }
    }
    return undefined;
};

MyArray.prototype.findIndex = function (fn) {
    for (let i = 0; i < this.size; ++i) {
        if (fn(this.elements.get(i))) {
            return i;
        }
    }
    return -1;
};

MyArray.prototype.equals = function (other) {
    if (this.size !== other.length()) return false;
    for (let i = 0; i < this.size; ++i) {
        if (this.elements.get(i) !== other.get(i)) {
            return false;
        }
    }
    return true;
};

MyArray.prototype.forEach = function (fn) {
    for (let i = 0; i < this.size; ++i) {
        fn(this.elements.get(i), i);
    }
};

MyArray.prototype.join = function (separator) {
    if (separator === undefined) {
        separator = ',';
    }
    let result = "";
    this.forEach(function(element, index) {
        result += element;
        if (this.size !== index + 1) {
            result += separator;
        }
    }.bind(this));
    return result;
};

MyArray.prototype.toString = function () {
    return this.join(',');
};

MyArray.prototype.map = function (fn) {
    const result = new MyArray();
    for (let i = 0; i < this.size; ++i) {
        result.push(fn(this.elements.get(i), i));
    }
    return result;
};

MyArray.prototype.filter = function (fn) {
    const result = new MyArray();
    for (let i = 0; i < this.size; ++i) {
        if (fn(this.elements.get(i))) {
            result.push(this.elements.get(i));
        }
    }
    return result;
};

MyArray.prototype.some = function (fn) {
    for (let i = 0; i < this.size; ++i) {
        if (fn(this.elements.get(i))) {
            return true;
        }
    }
    return false;
};

MyArray.prototype.every = function (fn) {
    for (let i = 0; i < this.size; ++i) {
        if (!fn(this.elements.get(i))) {
            return false;
        }
    }
    return true;
};

MyArray.prototype.fill = function (value, start = 0, end = this.size) {
    for (let i = start; i < end; ++i) {
        this.elements.set(i, value);
    }
};

MyArray.prototype.reverse = function () {
    for (let i = 0; i < this.size / 2; ++i) {
        const element = this.elements.get(i);
        this.elements.set(i, this.elements.get(this.size - i - 1));
        this.elements.set(this.size - i - 1, element);
    }
};

MyArray.prototype.shift = function () {
    if (this.size === 0) return undefined;
    const result = this.elements.get(0);
    for (let i = 0; i < this.size - 1; ++i) {
        this.elements.set(i, this.elements.get(i + 1));
    }
    this.size -= 1;
    return result;
};

MyArray.prototype.unshift = function (element) {
    for (let i = this.size; i > 0; --i) {
        this.set(i, this.elements.get(i - 1));
    }
    this.elements.set(0, element);
};

MyArray.prototype.slice = function (start = 0, end = this.size) {
    const result = new MyArray();
    for (i = start; i < end; ++i) {
        result.push(this.elements.get(i));
    }
    return result;
};

function getElementsToDelete(start, deleteCount) {
    const result = new MyArray();

    const condition = function(index) {
        if (deleteCount === undefined) {
            return index < this.size;
        }
        return index < start + deleteCount;
    }.bind(this);

    for (let i = start; condition(i); ++i) {
        result.push(this.elements.get(i));
    }
    
    return result;
}

MyArray.prototype.splice = function (start, deleteCount, ...args) {
    if (deleteCount > this.size - start) {
        deleteCount = undefined;
    }

    if (start > this.size) {
        start = this.size;
    }

    boundGetElementsToDelete = getElementsToDelete.bind(this);
    
    const elementsToDelete = boundGetElementsToDelete(start, deleteCount);

    const newArray = new MyArray();
    for (let i = 0; i < start; ++i) {
        newArray.push(this.elements.get(i));
    }

    for (let i = 0; i < args.length; ++i) {
        newArray.push(args[i]);
    }

    if (deleteCount !== undefined) {
        for (let i = start + deleteCount; i < this.size; ++i) {
            newArray.push(this.elements.get(i));
        }
    }

    for (let i = 0; i < newArray.length(); ++i) {
        this.set(i, newArray.get(i));
    }
    
    this.size = newArray.length();
    
    return elementsToDelete;
}

function print(arr) {
    arr.map(function(element) {
        console.log(element);
    })
}