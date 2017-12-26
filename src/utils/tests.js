/**
 * Returns the classes object from a jss styles object
 * @method getClasses
 * @param {Object} styles - jss styles object
 * @returns {Object} classes object
 */
export const getClasses = styles =>
    Object.keys(styles).reduce(
        (prev, curr) => Object.assign({}, prev, {[curr]: curr}),
        {}
    );
