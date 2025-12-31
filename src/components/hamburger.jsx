import { Motion } from "solid-motionone"

export default function Hamburger(props) {
	
	return (
		<Motion.button
			initial={false}
			onClick={() => props.toggle()}
			class="relative h-20 w-20 rounded-full bg-white/0"
		>
			<Motion.span
				animate={
					props.toggled
						? {
								rotate: ["0deg", "0deg", "45deg"],
								top: ["35%", "50%", "50%"],
								left: "50%",
								width: "40px",
						  }
						: {
								rotate: ["45deg", "0deg", "0deg"],
								top: ["50%", "50%", "35%"],
								left: "calc(50% + 8px)",
								width: "32px",
						  }
				}
				transition={{ duration: 0.3, easing: "ease-in-out" }}
				class="absolute h-1 w-8 rounded-sm bg-white"
				style={{
					top: "35%",
					left: "calc(50% + 4px)",
					transform: "translate(-50%, -50%)",
				}}
			/>
			<Motion.span
				animate={
					props.toggled
						? {
								rotate: ["0deg", "0deg", "-45deg"],
						  }
						: {
								rotate: ["-45deg", "0deg", "0deg"],
						  }
				}
				transition={{ duration: 0.3, easing: "ease-in-out" }}
				class="absolute h-1 w-10 rounded-sm bg-white"
				style={{
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			/>
			<Motion.span
				animate={
					props.toggled
						? {
								rotate: ["0deg", "0deg", "45deg"],
								bottom: ["35%", "50%", "50%"],
								left: "58%",
                                opacity: 0,
						  }
						: {
								rotate: ["45deg", "0deg", "0deg"],
								bottom: ["50%", "50%", "30%"],
								left: "calc(50% + 20px)",
                                opacity: 1
						  }
				}
				transition={{ duration: 0.3, easing: "ease-in-out" }}
				class="absolute h-1 w-5 rounded-sm bg-white"
				style={{
					bottom: "35%",
					left: "calc(50% + 10px)",
					transform: "translate(-50%, 50%)",
				}}
			/>
		</Motion.button>
	)
}
