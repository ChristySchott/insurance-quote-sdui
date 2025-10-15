interface StepProgressProps {
  totalSteps: number
  currentStep: number
  stepTitles: string[]
}

export function StepProgress({
  totalSteps,
  currentStep,
  stepTitles,
}: StepProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const isActive = index === currentStep
          const isLastStep = index === totalSteps - 1
          const isCompleted = index < currentStep

          return (
            <div
              key={index}
              className={`flex items-center ${!isLastStep ? 'flex-1' : 'px-8'}`}
            >
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span
                  className={`mt-2 text-sm text-center ${
                    isActive
                      ? 'text-primary-600 font-semibold'
                      : 'text-gray-600'
                  }`}
                >
                  {stepTitles[index]}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
