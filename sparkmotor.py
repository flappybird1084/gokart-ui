import RPi.GPIO as GPIO
import time

class PWMController:
    def __init__(self, pin, frequency=50):
        self.pin = pin
        self.frequency = frequency  # in Hz (50Hz = 20ms period)
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.OUT)
        self.pwm = GPIO.PWM(self.pin, self.frequency)
        self.pwm.start(0)

    def set_pulse_width(self, pulse_width_us):
        """
        Set the pulse width in microseconds.
        """
        if not 500 <= pulse_width_us <= 2500:
            raise ValueError("Pulse width must be between 500 and 2500 µs.")

        # Convert pulse width to duty cycle (percentage)
        duty_cycle = (pulse_width_us / 20000) * 100
        self.pwm.ChangeDutyCycle(duty_cycle)

    def set_power(self, power):
        """
        Set motor power in range -1.0 (full reverse) to 1.0 (full forward)
        """
        if not -1.0 <= power <= 1.0:
            raise ValueError("Power must be between -1.0 and 1.0.")

        # Map power to pulse width range (500 µs to 2500 µs)
        # Neutral (0) is at 1500 µs
        pulse_width = 1500 + power * 500  # Scale factor maps to 1000-2000 range
        print(f"Power: {power} -> Pulse Width: {pulse_width} µs -> {self.direction_info(pulse_width)}")
        self.set_pulse_width(pulse_width)

    def direction_info(self, pulse_width_us):
        """
        Return control direction based on pulse width.
        """
        if pulse_width_us <= 1000:
            return "Full Reverse"
        elif 1000 < pulse_width_us < 1475:
            return "Proportional Reverse"
        elif 1475 <= pulse_width_us <= 1525:
            return "Neutral"
        elif 1525 < pulse_width_us < 2000:
            return "Proportional Forward"
        elif pulse_width_us >= 2000:
            return "Full Forward"
        return "Unknown"

    def stop(self):
        self.pwm.stop()
        GPIO.cleanup()

# # ============================
# # Example Usage
# # ============================
# if __name__ == "__main__":
#     pwm_pin = 18  # Update with the correct GPIO pin
#     controller = PWMController(pin=pwm_pin)

#     try:
#         test_powers = [-1.0, -0.5, 0.0, 0.5, 1.0]
#         for power in test_powers:
#             controller.set_power(power)
#             time.sleep(2)

#     except KeyboardInterrupt:
#         print("Interrupted by user.")
#     finally:
#         controller.stop()