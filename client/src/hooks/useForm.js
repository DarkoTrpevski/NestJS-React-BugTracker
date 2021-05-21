import { useState } from 'react';

const useForm = (initialState) => {

	const [state, setState] = useState(initialState);

	// Store input value in state
	const handleChange = (e) => {
    const { name, type } = e.target;
		// Event persistence
		e.persist();

		const getValue = () => {
			if (type === 'checkbox') return (e.target).checked;
			else if (type === 'select-one') {
				const selectedIndex = (e.target).options.selectedIndex;
				return (e.target).options[selectedIndex].value
			}
			return e.target.value;
		}
		const value = getValue();

		setState((state) => ({ ...state, [name]: value }));
	};

	return [state, setState, handleChange];
};

export default useForm;