// @flow
import React from 'react';
import injectSheet from 'react-jss';
import Loader from '../components/loader/loader';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    label: {
        marginBottom: 20
    },
    inputWrapper: {
        extend: 'label',
        display: 'flex',
        flexDirection: 'column',
        width: 300
    },
    input: {
        border: '1px solid #ccc',
        outline: 'none'
    },
    text: {
        extend: 'label',
        display: 'flex',
        flexDirection: 'column'
    },
    sup: {
        color: 'red',
        fontSize: 11,
        marginLeft: 5
    },
    button: {
        border: 'none',
        backgroundColor: '#000',
        color: '#fff',
        width: 200,
        alignSelf: 'center'
    },
    error: {
        color: 'red',
        fontSize: 10
    }
};

/**
 * Validates email
 * @param {String} email - email typed by the user
 * @returns {Boolean} is email valid
 */
const isEmailValid = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
};

type Props = {
  classes: Object
};

/**
 * Creates contact form page
 * @extends React
 */
class Contact extends React.Component {
    props: Props;

    /**
     * Constructor, bind callbacks and initializes state
     * @method  constructor
     * @param   {Object}    props - react props
     */
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            text: '',
            errors: {},
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Handle input change
     * @method  handleChange
     * @param   {Object}     key - changed key
     * @returns {Function} callback function
     */
    handleChange(key: string): Function {
        return (event: Object) => {
            this.setState({[key]: event.target.value});
        };
    }

    /**
     * Handle form submission
     * @method  handleSubmit
     * @param   {Object}     event - submit event
     * @returns {Promise} http call promise
     */
    handleSubmit(event) {
        event.preventDefault();

        if (!isEmailValid(this.state.email)) {
            this.setState({
                errors: {email: 'Invalid Email'}
            });
            return Promise.resolve();
        }

        this.setState({isLoading: true});

        const {
            name, email, subject, text
        } = this.state;

        return emailjs
            .send('default_service', 'basic', {
                name,
                email,
                subject,
                text
            })
            .then(() => {
                this.setState({isLoading: false});
            });
    }

    /**
     * Render form
     * @method  render
     * @returns {Node} react node
     */
    render() {
        const {classes} = this.props;

        return (
            <form className={classes.root} onSubmit={this.handleSubmit}>
                {this.state.isLoading && <Loader />}
                <h1>Contact</h1>
                <label className={classes.inputWrapper} htmlFor="name">
                    <span>
                    Name<sup className={classes.sup}>*</sup>
                    </span>
                    <input
                        className={classes.input}
                        name="name"
                        type="text"
                        required
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                    />
                    {this.state.errors.name && (
                        <span className={classes.error}>{this.state.errors.name}</span>
                    )}
                </label>

                <label className={classes.inputWrapper} htmlFor="email">
                    <span>
                    Email address<sup className={classes.sup}>*</sup>
                    </span>
                    <input
                        className={classes.input}
                        name="email"
                        type="text"
                        required
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                    />
                    {this.state.errors.email && (
                        <span className={classes.error}>{this.state.errors.email}</span>
                    )}
                </label>

                <label className={classes.inputWrapper} htmlFor="subject">
                    <span>
                    Subject<sup className={classes.sup}>*</sup>
                    </span>
                    <input
                        className={classes.input}
                        name="subject"
                        type="text"
                        required
                        value={this.state.subject}
                        onChange={this.handleChange('subject')}
                    />
                    {this.state.errors.subject && (
                        <span className={classes.error}>{this.state.errors.subject}</span>
                    )}
                </label>

                <label className={classes.text} htmlFor="text">
                    <span>
                    Text<sup className={classes.sup}>*</sup>
                    </span>
                    <textarea
                        className={classes.input}
                        rows={6}
                        name="text"
                        required
                        value={this.state.text}
                        onChange={this.handleChange('text')}
                    />
                    {this.state.errors.text && (
                        <span className={classes.error}>{this.state.errors.text}</span>
                    )}
                </label>

                <input className={classes.button} type="submit" value="Submit" />
            </form>
        );
    }
}

export default injectSheet(styles)(Contact);
