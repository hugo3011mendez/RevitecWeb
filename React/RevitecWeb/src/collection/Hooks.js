import { useEffect, useRef, useState } from 'react';

/**
 * Reproduces sound.
 * @param sound Imported audio file or URL.
 * @returns {[boolean, function]} Boolean indicates whether the audio is playing,
 *     function receives a boolean: true for play, false for pause.
 */
export function useAudio(sound) {
    const [audio] = useState(new Audio(sound));
    const [playing, setPlaying] = useState(false);

    const toggle = play => setPlaying(play);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
            audio.pause();
        };
    }, []);

    return [playing, toggle];
}

/**
 * Uses state and effect to load and reload a value under given circunstances.
 * @param {function} onGet Function that returns the updated value. It's called on load and reload.
 * @param {array} watch When these change, the value is reloaded.
 * @param defaultValue Default value.
 * @returns {[any, function]} The value and a function that triggers a reload.
 */
export function useLoad(onGet, watch = [], defaultValue) {
    const [value, setValue] = useState(defaultValue);
    const loadValue = async () => setValue(typeof onGet === 'function' ? await onGet() : null);
    useEffect(() => { loadValue(); }, watch);

    return [value, loadValue];
}

/**
 * Does something every certain amount of time.
 * @param {number} millis Interval length.
 * @param {function} onTick Triggered every interval. Receives the number of intervals that have passed.
 */
export function useTimeInterval(millis = 1000, onTick) {
    let counter = 0;
    useEffect(() => {
        const interval = setInterval(() => {
            counter++;
            if (typeof onTick === 'function') onTick(counter);
        }, millis);
        return () => clearInterval(interval);
    }, []);
    return counter;
}

/**
 * Returns the previous value of the given object.
 * @see https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
 * @param value
 */
export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
