/* Mind-map content (structured data). Node: {t,k,note,d,ar,kids}; k = def|cls|ex|exam|warn|n. Branches link to lecture topics (topic) or page sections (sec). */
window.MM_DATA={
 "l1": {
  "id": "l1",
  "tab": "OS · L1 Intro",
  "title": "Lecture 1 — Introduction and Concepts",
  "center": "Operating System",
  "sub": "Lecture 1",
  "branches": [
   {
    "t": "What is an Operating System?",
    "topic": "1-0",
    "kids": [
     {
      "t": "controls the hardware",
      "k": "def",
      "note": "processors · storage · I/O devices · communication devices · data"
     },
     {
      "t": "manages the hardware",
      "k": "def"
     },
     {
      "t": "acts as a resource allocator",
      "k": "def",
      "note": "CPU, memory and I/O are shared among programs",
      "d": "Several programs ask for the same resource; the OS decides who gets it and for how long.",
      "ar": "لما أكتر من برنامج يطلبوا نفس المورد (زي الـ CPU) الـ OS هو اللي يقرر مين ياخد ولمدة قد إيه."
     },
     {
      "t": "program that controls the execution of application programs",
      "k": "def",
      "note": "also coordinates all software activities inside the computer",
      "d": "The OS is the means through which allocation and usage of hardware resources is controlled and all software activities are coordinated.",
      "ar": "الـ OS هو الوسيط اللي بيتحكم في توزيع الموارد وبينسّق شغل كل الـ software."
     },
     {
      "t": "Where can an OS fit?",
      "k": "n",
      "note": "Users → editors · games · compilers · database → OS → hardware"
     }
    ]
   },
   {
    "t": "Operating System Objectives",
    "topic": "1-1",
    "kids": [
     {
      "t": "Convenience",
      "k": "cls",
      "note": "makes the computer more convenient to use"
     },
     {
      "t": "Ease of Communication",
      "k": "cls",
      "kids": [
       {
        "t": "computer ↔ user (friendly user interface)",
        "k": "n"
       },
       {
        "t": "among system components",
        "k": "n"
       }
      ]
     },
     {
      "t": "Abstraction",
      "k": "cls",
      "note": "hardware-independent programming model",
      "d": "You write a program without caring which disk or screen is installed.",
      "ar": "بتكتب البرنامج من غير ما تعرف نوع الـ hardware بالتفصيل."
     },
     {
      "t": "Efficiency",
      "k": "cls",
      "note": "resources used in an efficient manner"
     },
     {
      "t": "Monitoring and Alerting",
      "k": "cls",
      "note": "monitors and alerts failures and problems"
     },
     {
      "t": "Ability to Evolve",
      "k": "cls",
      "note": "develop · test · introduce new functions without interfering with the services"
     },
     {
      "t": "Protection",
      "k": "cls",
      "note": "a security layer protects the user’s data"
     },
     {
      "t": "Increasing performance",
      "k": "cls",
      "note": "maximize throughput · minimize time to execute commands",
      "d": "Throughput = amount of work finished per unit of time.",
      "ar": "الـ throughput = كمية الشغل اللي بيخلص في وقت معين."
     },
     {
      "t": "Know all 8 objectives",
      "k": "exam",
      "note": "mnemonic: C-E-A-E-M-A-P-I"
     }
    ]
   },
   {
    "t": "Services Provided by the OS",
    "topic": "1-2",
    "kids": [
     {
      "t": "Program development",
      "k": "cls",
      "note": "editors and debuggers"
     },
     {
      "t": "Program execution",
      "k": "cls",
      "note": "load program and data · initialize environment"
     },
     {
      "t": "Access to I/O devices",
      "k": "cls",
      "note": "read from and write to ports and units"
     },
     {
      "t": "Controlled access to data",
      "k": "cls",
      "note": "access protection"
     },
     {
      "t": "System access",
      "k": "cls",
      "note": "user authentication (login)"
     },
     {
      "t": "Error detection and response",
      "k": "cls",
      "note": "an error message should be displayed",
      "kids": [
       {
        "t": "Internal / external hardware errors",
        "k": "cls",
        "kids": [
         {
          "t": "memory error",
          "k": "n"
         },
         {
          "t": "device failure",
          "k": "n"
         }
        ]
       },
       {
        "t": "Software errors",
        "k": "cls",
        "kids": [
         {
          "t": "arithmetic overflow",
          "k": "n"
         },
         {
          "t": "access to forbidden memory locations",
          "k": "n"
         }
        ]
       }
      ]
     },
     {
      "t": "Accounting",
      "k": "cls",
      "kids": [
       {
        "t": "collect statistics",
        "k": "n"
       },
       {
        "t": "monitor performance",
        "k": "n"
       },
       {
        "t": "anticipate future enhancements",
        "k": "n"
       },
       {
        "t": "billing users",
        "k": "n"
       }
      ]
     },
     {
      "t": "7 services",
      "k": "exam",
      "note": "Program dev · exec · I/O · data · system access · errors · accounting"
     }
    ]
   },
   {
    "t": "Functions of an OS on a Network",
    "topic": "1-3",
    "kids": [
     {
      "t": "Sharing H/W among users",
      "k": "cls"
     },
     {
      "t": "Allowing users to share data",
      "k": "cls"
     },
     {
      "t": "Preventing users from interfering with one another",
      "k": "cls"
     },
     {
      "t": "Scheduling resources among users",
      "k": "cls"
     },
     {
      "t": "Organizing data for secure and rapid access",
      "k": "cls"
     },
     {
      "t": "Handling network communications",
      "k": "cls"
     },
     {
      "t": "6 functions",
      "k": "exam"
     }
    ]
   },
   {
    "t": "Components of a Computer System",
    "topic": "1-4",
    "kids": [
     {
      "t": "Hardware",
      "k": "cls",
      "kids": [
       {
        "t": "input devices",
        "k": "n"
       },
       {
        "t": "processing devices (CPU)",
        "k": "n"
       },
       {
        "t": "output devices",
        "k": "n"
       },
       {
        "t": "storage devices",
        "k": "n"
       }
      ]
     },
     {
      "t": "Applications software",
      "k": "cls",
      "note": "word processing · spreadsheet · database"
     },
     {
      "t": "System software",
      "k": "cls",
      "note": "operating system · utilities"
     },
     {
      "t": "End users",
      "k": "def",
      "note": "need the output the computer produces"
     },
     {
      "t": "Programmers",
      "k": "def",
      "note": "write programs to supply that output"
     },
     {
      "t": "Layers (top → bottom)",
      "k": "cls",
      "kids": [
       {
        "t": "End User",
        "k": "n"
       },
       {
        "t": "Application Programs",
        "k": "n"
       },
       {
        "t": "Utilities",
        "k": "n"
       },
       {
        "t": "Operating Systems",
        "k": "n"
       },
       {
        "t": "Computer Hardware",
        "k": "n"
       }
      ]
     },
     {
      "t": "Who touches which layer?",
      "k": "exam",
      "kids": [
       {
        "t": "End User → Application programs",
        "k": "n"
       },
       {
        "t": "Programmer → Utilities + OS",
        "k": "n"
       },
       {
        "t": "OS Designer → Hardware",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Computer-System Operation",
    "topic": "1-5",
    "kids": [
     {
      "t": "I/O devices and the CPU can execute concurrently",
      "k": "def"
     },
     {
      "t": "device controller",
      "k": "def",
      "note": "responsible for one particular device type"
     },
     {
      "t": "local buffer",
      "k": "def",
      "note": "each controller has its own memory"
     },
     {
      "t": "CPU moves data",
      "k": "n",
      "note": "main memory ↔ local buffers"
     },
     {
      "t": "I/O is from the device to the local buffer of the controller",
      "k": "n"
     },
     {
      "t": "system bus",
      "k": "ex",
      "note": "CPU · disk / printer / tape controllers · memory controller (figure)"
     }
    ]
   },
   {
    "t": "Storage-Device Hierarchy",
    "topic": "1-6",
    "kids": [
     {
      "t": "organized in a hierarchy by",
      "k": "def",
      "kids": [
       {
        "t": "Speed",
        "k": "cls"
       },
       {
        "t": "Cost",
        "k": "cls"
       },
       {
        "t": "Volatility",
        "k": "cls"
       }
      ]
     },
     {
      "t": "Levels (top → bottom)",
      "k": "cls",
      "kids": [
       {
        "t": "registers",
        "k": "n"
       },
       {
        "t": "cache",
        "k": "n"
       },
       {
        "t": "main memory",
        "k": "n",
        "note": "volatile (Lecture 2)"
       },
       {
        "t": "electronic disk",
        "k": "n"
       },
       {
        "t": "magnetic disk",
        "k": "n"
       },
       {
        "t": "optical disk",
        "k": "n"
       },
       {
        "t": "magnetic tapes",
        "k": "n"
       }
      ]
     },
     {
      "t": "Draw the 7-level pyramid in order",
      "k": "exam"
     }
    ]
   },
   {
    "t": "What is a Kernel?",
    "topic": "1-7",
    "kids": [
     {
      "t": "Module Kernel is responsible for",
      "k": "def",
      "kids": [
       {
        "t": "memory allocation",
        "k": "n"
       },
       {
        "t": "garbage collection",
        "k": "n"
       },
       {
        "t": "object finalization",
        "k": "n"
       },
       {
        "t": "module termination",
        "k": "n"
       },
       {
        "t": "interfacing to the underlying OS and clock functions",
        "k": "n"
       }
      ]
     },
     {
      "t": "Figure",
      "k": "ex",
      "note": "Kernel (center) → Services → User Processes (outer ring)"
     }
    ]
   },
   {
    "t": "Types of Computer Systems (1/2)",
    "topic": "1-8",
    "kids": [
     {
      "t": "Simple Batch",
      "k": "cls",
      "kids": [
       {
        "t": "runs only one job at a time",
        "k": "n"
       },
       {
        "t": "smoothed transition between jobs for maximum utilization",
        "k": "n"
       },
       {
        "t": "programs / data submitted in groups or batches",
        "k": "n"
       }
      ]
     },
     {
      "t": "Multi-programmed Batch",
      "k": "cls",
      "kids": [
       {
        "t": "uses job scheduling to increase resource utilization",
        "k": "n"
       },
       {
        "t": "stores more than one program in memory",
        "k": "n"
       },
       {
        "t": "any one job rarely uses all resources",
        "k": "n"
       },
       {
        "t": "when one job waits for I/O, another can use the CPU",
        "k": "n"
       }
      ]
     },
     {
      "t": "Time-Sharing",
      "k": "cls",
      "kids": [
       {
        "t": "switches between multiple jobs",
        "k": "n"
       },
       {
        "t": "interactive · low response time",
        "k": "n"
       },
       {
        "t": "many simultaneous users",
        "k": "n"
       },
       {
        "t": "a program shares in time only if it exists in memory",
        "k": "n"
       }
      ]
     },
     {
      "t": "Personal (Desktop)",
      "k": "cls",
      "kids": [
       {
        "t": "every user has own memory, processors and I/O",
        "k": "n"
       },
       {
        "t": "became possible after microprocessors",
        "k": "n"
       },
       {
        "t": "data may be shared through networks",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Types of Computer Systems (2/2)",
    "topic": "1-8",
    "kids": [
     {
      "t": "Parallel",
      "k": "cls",
      "kids": [
       {
        "t": "2 or more CPUs share a common bus",
        "k": "n"
       },
       {
        "t": "a job is split into discrete (independent) small jobs",
        "k": "n"
       },
       {
        "t": "exponential speed-up needs an exponential increase in processors",
        "k": "n"
       }
      ]
     },
     {
      "t": "Distributed",
      "k": "cls",
      "kids": [
       {
        "t": "independent computers communicate over WAN / LAN and work as a single system",
        "k": "n"
       },
       {
        "t": "Client-Server",
        "k": "n",
        "note": "client needs service · server does a single service (printing, graphics, DB, e-mail)"
       },
       {
        "t": "Peer-to-Peer",
        "k": "n",
        "note": "decentralized computers provide services to peers"
       },
       {
        "t": "computing distributed to the sites",
        "k": "n"
       },
       {
        "t": "incremental growth",
        "k": "n"
       }
      ]
     },
     {
      "t": "Real-Time",
      "k": "cls",
      "note": "dedicated control applications with fixed-time constraints",
      "kids": [
       {
        "t": "scientific experiments · medical imaging · industrial control",
        "k": "ex"
       },
       {
        "t": "Hard real-time",
        "k": "cls",
        "kids": [
         {
          "t": "secondary storage limited or absent",
          "k": "n"
         },
         {
          "t": "data stored in short-term memory",
          "k": "n"
         },
         {
          "t": "conflicts with time-sharing",
          "k": "n"
         },
         {
          "t": "not supported by general-purpose OS",
          "k": "n"
         }
        ]
       },
       {
        "t": "Soft real-time",
        "k": "cls",
        "kids": [
         {
          "t": "multimedia · virtual reality",
          "k": "n"
         },
         {
          "t": "requires advanced OS features",
          "k": "n"
         }
        ]
       }
      ]
     },
     {
      "t": "Handheld",
      "k": "cls",
      "kids": [
       {
        "t": "PDAs · cellular telephones",
        "k": "ex"
       },
       {
        "t": "limited memory",
        "k": "warn"
       },
       {
        "t": "slow processors",
        "k": "warn"
       },
       {
        "t": "small display screens",
        "k": "warn"
       }
      ]
     }
    ]
   },
   {
    "t": "Computer Categories vs. Systems",
    "topic": "1-9",
    "kids": [
     {
      "t": "Mobile devices",
      "k": "cls",
      "note": "very small wireless phone / pager based; limited Internet access",
      "kids": [
       {
        "t": "→ Handheld systems",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Microcomputers (PCs)",
      "k": "cls",
      "note": "computer-on-a-chip (microprocessor)",
      "kids": [
       {
        "t": "PC compatible (Intel)",
        "k": "n"
       },
       {
        "t": "Macintosh (Apple)",
        "k": "n"
       },
       {
        "t": "→ Desktop systems",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Midrange (minicomputers)",
      "k": "cls",
      "note": "between micro and mainframe",
      "kids": [
       {
        "t": "→ Desktop & Real-time systems",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Mainframes",
      "k": "cls",
      "note": "high-volume business transactions, 24 hours a day",
      "kids": [
       {
        "t": "→ Batch & Time-share (Hybrid)",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Supercomputers",
      "k": "cls",
      "note": "very high speed and extreme accuracy",
      "kids": [
       {
        "t": "often many PCs / microprocessors linked together",
        "k": "n"
       },
       {
        "t": "→ Parallel & Distributed systems",
        "k": "exam"
       }
      ]
     }
    ]
   }
  ]
 },
 "l2": {
  "id": "l2",
  "tab": "OS · L2 Structures",
  "title": "Lecture 2 — Operating System Structures",
  "center": "OS Structures",
  "sub": "Lecture 2",
  "branches": [
   {
    "t": "Common System Components",
    "topic": "2-0",
    "kids": [
     {
      "t": "Process Management",
      "k": "cls"
     },
     {
      "t": "Main Memory Management",
      "k": "cls"
     },
     {
      "t": "Secondary-Storage Management",
      "k": "cls"
     },
     {
      "t": "I/O System Management",
      "k": "cls"
     },
     {
      "t": "File Management",
      "k": "cls"
     },
     {
      "t": "Protection System",
      "k": "cls"
     },
     {
      "t": "Networking",
      "k": "cls"
     },
     {
      "t": "Command-Interpreter System",
      "k": "cls"
     },
     {
      "t": "8 components",
      "k": "exam",
      "note": "P-M-S-I-F-P-N-C"
     }
    ]
   },
   {
    "t": "Process Management",
    "topic": "2-1",
    "kids": [
     {
      "t": "process = a program in execution",
      "k": "def",
      "note": "needs CPU time · memory · files · I/O devices"
     },
     {
      "t": "OS responsibilities",
      "k": "cls",
      "kids": [
       {
        "t": "process creation and deletion",
        "k": "n"
       },
       {
        "t": "process suspension and resumption",
        "k": "n"
       },
       {
        "t": "mechanisms for process synchronization",
        "k": "n"
       },
       {
        "t": "mechanisms for process communication",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Main-Memory Management",
    "topic": "2-1",
    "kids": [
     {
      "t": "memory = large array of words or bytes",
      "k": "def",
      "note": "each with its own address; quickly accessible data shared by CPU and I/O devices"
     },
     {
      "t": "volatile",
      "k": "warn",
      "note": "loses its contents in case of system failure"
     },
     {
      "t": "OS responsibilities",
      "k": "cls",
      "kids": [
       {
        "t": "keep track of which parts are used and by whom",
        "k": "n"
       },
       {
        "t": "decide which processes to load when space becomes available",
        "k": "n"
       },
       {
        "t": "allocate and de-allocate memory space as needed",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Secondary-Storage Management",
    "topic": "2-1",
    "kids": [
     {
      "t": "backs up main memory",
      "k": "def",
      "note": "main memory is volatile and too small"
     },
     {
      "t": "disks are the principal on-line storage medium",
      "k": "n",
      "note": "for programs and data"
     },
     {
      "t": "OS responsibilities",
      "k": "cls",
      "kids": [
       {
        "t": "free space management",
        "k": "n"
       },
       {
        "t": "storage allocation",
        "k": "n"
       },
       {
        "t": "disk scheduling",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "I/O System Management",
    "topic": "2-2",
    "kids": [
     {
      "t": "The I/O system consists of",
      "k": "cls",
      "kids": [
       {
        "t": "a buffer-caching system",
        "k": "n"
       },
       {
        "t": "a general device-driver interface",
        "k": "n"
       },
       {
        "t": "drivers for specific hardware devices",
        "k": "n"
       }
      ]
     },
     {
      "t": "I/O devices and the CPU can execute concurrently",
      "k": "def"
     },
     {
      "t": "each device controller handles one device type and has a local buffer",
      "k": "def"
     },
     {
      "t": "CPU moves data",
      "k": "n",
      "note": "main memory ↔ local buffers"
     },
     {
      "t": "controller informs the CPU it finished by causing an interrupt",
      "k": "exam"
     }
    ]
   },
   {
    "t": "Interrupts",
    "topic": "2-3",
    "kids": [
     {
      "t": "Interrupt transfers control to the ISR",
      "k": "def",
      "note": "through the interrupt vector = addresses of all service routines"
     },
     {
      "t": "save the address of the interrupted instruction and the state of the CPU",
      "k": "n"
     },
     {
      "t": "incoming interrupts are disabled while another is processed",
      "k": "warn",
      "note": "prevents a lost interrupt"
     },
     {
      "t": "trap",
      "k": "def",
      "note": "software-generated interrupt caused by an error or a user request"
     },
     {
      "t": "An operating system is interrupt driven",
      "k": "def"
     },
     {
      "t": "Classes of interrupts",
      "k": "cls",
      "kids": [
       {
        "t": "Program",
        "k": "cls",
        "kids": [
         {
          "t": "arithmetic overflow",
          "k": "n"
         },
         {
          "t": "division by zero",
          "k": "n"
         },
         {
          "t": "execute illegal instruction",
          "k": "n"
         },
         {
          "t": "reference outside user’s memory space",
          "k": "n"
         }
        ]
       },
       {
        "t": "Timer",
        "k": "cls"
       },
       {
        "t": "I/O",
        "k": "cls"
       },
       {
        "t": "Hardware failure",
        "k": "cls"
       }
      ]
     },
     {
      "t": "Interrupt handler",
      "k": "def",
      "note": "determines the nature of the interrupt and performs the needed actions; generally part of the OS"
     },
     {
      "t": "Interrupt cycle",
      "k": "cls",
      "note": "Fetch cycle → Execute cycle → Interrupt cycle",
      "kids": [
       {
        "t": "processor checks for interrupts",
        "k": "n"
       },
       {
        "t": "none → fetch next instruction of the current program",
        "k": "n"
       },
       {
        "t": "pending → suspend current program, execute the interrupt handler",
        "k": "n"
       }
      ]
     },
     {
      "t": "Example",
      "k": "ex",
      "kids": [
       {
        "t": "CPU runs a program",
        "k": "n"
       },
       {
        "t": "interrupt occurs (user hits a key)",
        "k": "n"
       },
       {
        "t": "OS saves CPU state",
        "k": "n"
       },
       {
        "t": "CPU transfers control to ISR",
        "k": "n"
       },
       {
        "t": "ISR completes",
        "k": "n"
       },
       {
        "t": "OS restores CPU state",
        "k": "n"
       },
       {
        "t": "original program continues",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Multiple Interrupts",
    "topic": "2-4",
    "kids": [
     {
      "t": "Disable interrupts while one is being processed",
      "k": "def",
      "note": "processor ignores any new interrupt request signals"
     },
     {
      "t": "Sequential order",
      "k": "cls",
      "kids": [
       {
        "t": "interrupts remain pending until the processor enables interrupts",
        "k": "n"
       },
       {
        "t": "after the handler completes, the processor checks for additional interrupts",
        "k": "n"
       }
      ]
     },
     {
      "t": "Priorities",
      "k": "cls",
      "kids": [
       {
        "t": "higher-priority interrupts cause lower-priority ones to wait",
        "k": "n"
       },
       {
        "t": "a lower-priority handler can itself be interrupted (nested)",
        "k": "n"
       },
       {
        "t": "input from a communication line must be absorbed quickly to make room for more input",
        "k": "ex"
       }
      ]
     },
     {
      "t": "Figure (a) sequential vs (b) nested processing",
      "k": "exam"
     }
    ]
   },
   {
    "t": "I/O Structure and DMA",
    "topic": "2-5",
    "kids": [
     {
      "t": "Starting I/O",
      "k": "n",
      "note": "control information is loaded to the I/O device, then control is transferred to it"
     },
     {
      "t": "Synchronous",
      "k": "cls",
      "kids": [
       {
        "t": "after I/O starts, control returns only after I/O is complete",
        "k": "n"
       },
       {
        "t": "the requesting process is waiting",
        "k": "n"
       }
      ]
     },
     {
      "t": "Asynchronous",
      "k": "cls",
      "kids": [
       {
        "t": "control returns to the program without waiting for I/O to complete",
        "k": "n"
       },
       {
        "t": "processes must check the device status to know when I/O is complete",
        "k": "n"
       }
      ]
     },
     {
      "t": "requests for I/O on busy devices must be queued until the device is available",
      "k": "n"
     },
     {
      "t": "Direct Memory Access (DMA)",
      "k": "def",
      "note": "for high-speed I/O devices (close to memory speeds)",
      "kids": [
       {
        "t": "controller transfers blocks of data from buffer storage directly to main memory",
        "k": "n"
       },
       {
        "t": "without CPU intervention",
        "k": "exam"
       },
       {
        "t": "the hardware that operates I/O in this mode is called a DMA channel",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "File Management",
    "topic": "2-6",
    "kids": [
     {
      "t": "file = a collection of related information defined by its creator",
      "k": "def",
      "note": "commonly programs (source and object forms) and data"
     },
     {
      "t": "OS responsibilities",
      "k": "cls",
      "kids": [
       {
        "t": "file creation and deletion",
        "k": "n"
       },
       {
        "t": "directory creation and deletion",
        "k": "n"
       },
       {
        "t": "primitives for manipulating files and directories",
        "k": "n"
       },
       {
        "t": "file backup on stable (nonvolatile) storage media",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Protection System",
    "topic": "2-6",
    "kids": [
     {
      "t": "mechanism for controlling access",
      "k": "def",
      "note": "by programs, processes or users to system and user resources"
     },
     {
      "t": "The mechanism must",
      "k": "cls",
      "kids": [
       {
        "t": "distinguish between authorized and unauthorized usage",
        "k": "n"
       },
       {
        "t": "specify the controls to be imposed",
        "k": "n"
       },
       {
        "t": "provide a means of enforcement",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Command-Interpreter System",
    "topic": "2-6",
    "kids": [
     {
      "t": "control statements deal with",
      "k": "def",
      "kids": [
       {
        "t": "process creation and management",
        "k": "n"
       },
       {
        "t": "I/O handling",
        "k": "n"
       },
       {
        "t": "secondary-storage management",
        "k": "n"
       },
       {
        "t": "main-memory management",
        "k": "n"
       },
       {
        "t": "file-system access",
        "k": "n"
       },
       {
        "t": "protection",
        "k": "n"
       },
       {
        "t": "networking",
        "k": "n"
       }
      ]
     },
     {
      "t": "The program that reads and interprets them is called",
      "k": "cls",
      "kids": [
       {
        "t": "control-card interpreter",
        "k": "n"
       },
       {
        "t": "command-line interpreter",
        "k": "n"
       },
       {
        "t": "shell",
        "k": "n",
        "note": "in UNIX"
       }
      ]
     },
     {
      "t": "function: get and execute the next command statement",
      "k": "exam"
     }
    ]
   },
   {
    "t": "System Calls",
    "topic": "2-7",
    "kids": [
     {
      "t": "the interface between a running program and the OS",
      "k": "def"
     },
     {
      "t": "generally available as assembly-language instructions",
      "k": "n"
     },
     {
      "t": "languages like C allow system calls to be made directly",
      "k": "n"
     },
     {
      "t": "3 methods to pass parameters",
      "k": "cls",
      "kids": [
       {
        "t": "in registers",
        "k": "n"
       },
       {
        "t": "store in a table in memory and pass the table address",
        "k": "n"
       },
       {
        "t": "push onto the stack by the program, pop off by the OS",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "System Programs",
    "topic": "2-8",
    "kids": [
     {
      "t": "provide a convenient environment for program development and execution",
      "k": "def"
     },
     {
      "t": "Categories",
      "k": "cls",
      "kids": [
       {
        "t": "file manipulation",
        "k": "n"
       },
       {
        "t": "status information",
        "k": "n"
       },
       {
        "t": "file modification",
        "k": "n"
       },
       {
        "t": "programming language support",
        "k": "n"
       },
       {
        "t": "program loading and execution",
        "k": "n"
       },
       {
        "t": "communications",
        "k": "n"
       },
       {
        "t": "application programs",
        "k": "n"
       }
      ]
     },
     {
      "t": "most users’ view of the OS is defined by system programs, not the actual system calls",
      "k": "exam"
     }
    ]
   },
   {
    "t": "System Structure",
    "topic": "2-9",
    "kids": [
     {
      "t": "MS-DOS (simple approach)",
      "k": "cls",
      "kids": [
       {
        "t": "written to provide the most functionality in the least space",
        "k": "n"
       },
       {
        "t": "not divided into modules",
        "k": "warn",
        "note": "interfaces and levels of functionality are not well separated"
       },
       {
        "t": "executes one process at a time",
        "k": "n"
       },
       {
        "t": "layers: application program → resident system program → MS-DOS device drivers → ROM BIOS device drivers",
        "k": "n"
       }
      ]
     },
     {
      "t": "UNIX",
      "k": "cls",
      "note": "limited by hardware functionality",
      "kids": [
       {
        "t": "two separable parts: system programs + the kernel",
        "k": "n"
       },
       {
        "t": "kernel = everything below the system-call interface and above the hardware",
        "k": "n"
       },
       {
        "t": "file system · CPU scheduling · memory management · … = a large number of functions for one level",
        "k": "n"
       },
       {
        "t": "can run multiple programs",
        "k": "n"
       }
      ]
     },
     {
      "t": "Layered approach",
      "k": "cls",
      "note": "layer 0 = hardware · layer N = user interface",
      "kids": [
       {
        "t": "each layer uses functions and services of only lower-level layers",
        "k": "n"
       },
       {
        "t": "first layered OS had six layers",
        "k": "n",
        "kids": [
         {
          "t": "layer 5: user programs",
          "k": "n"
         },
         {
          "t": "layer 4: buffering for input and output",
          "k": "n"
         },
         {
          "t": "layer 3: operator-console device driver",
          "k": "n"
         },
         {
          "t": "layer 2: memory management",
          "k": "n"
         },
         {
          "t": "layer 1: CPU scheduling",
          "k": "n"
         },
         {
          "t": "layer 0: hardware",
          "k": "n"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "t": "Virtual Machines",
    "topic": "2-10",
    "kids": [
     {
      "t": "takes the layered approach to its logical conclusion",
      "k": "def",
      "note": "treats hardware and the OS kernel as though they were all hardware"
     },
     {
      "t": "provides an interface identical to the underlying bare hardware",
      "k": "def"
     },
     {
      "t": "OS creates the illusion of multiple processes, each on its own processor with its own (virtual) memory",
      "k": "n"
     },
     {
      "t": "resources of the physical computer are shared",
      "k": "n",
      "kids": [
       {
        "t": "CPU scheduling → each process appears to have its own processor",
        "k": "n"
       },
       {
        "t": "spooling + file system → virtual line printers and card readers",
        "k": "n"
       }
      ]
     },
     {
      "t": "Advantages",
      "k": "cls",
      "kids": [
       {
        "t": "complete protection of system resources (each VM isolated)",
        "k": "n"
       },
       {
        "t": "perfect vehicle for OS research and development without disrupting normal operation",
        "k": "n"
       }
      ]
     },
     {
      "t": "Disadvantages",
      "k": "warn",
      "kids": [
       {
        "t": "isolation permits no direct sharing of resources",
        "k": "n"
       },
       {
        "t": "difficult to implement (exact duplicate of the underlying machine)",
        "k": "n"
       }
      ]
     },
     {
      "t": "System models figure",
      "k": "ex",
      "note": "non-virtual machine vs virtual machine (virtual machine layer between kernels and hardware)"
     }
    ]
   },
   {
    "t": "System Design and Implementation",
    "topic": "2-11",
    "kids": [
     {
      "t": "Design goals",
      "k": "cls",
      "kids": [
       {
        "t": "User goals",
        "k": "n",
        "note": "convenient · easy to learn · reliable · safe · fast"
       },
       {
        "t": "System goals",
        "k": "n",
        "note": "easy to design, implement, maintain · flexible · reliable · error-free · efficient"
       }
      ]
     },
     {
      "t": "Implementation",
      "k": "cls",
      "note": "traditionally in assembly language; now high-level languages",
      "kids": [
       {
        "t": "written faster",
        "k": "n"
       },
       {
        "t": "more compact",
        "k": "n"
       },
       {
        "t": "easier to understand and debug",
        "k": "n"
       },
       {
        "t": "far easier to port (move to other hardware)",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Mechanisms and Policies",
    "topic": "2-11",
    "kids": [
     {
      "t": "Mechanisms determine HOW to do something",
      "k": "exam"
     },
     {
      "t": "Policies decide WHAT will be done",
      "k": "exam"
     },
     {
      "t": "separating policy from mechanism is a very important principle",
      "k": "def",
      "note": "allows maximum flexibility if policy decisions are changed later"
     }
    ]
   }
  ]
 },
 "l3": {
  "id": "l3",
  "tab": "OS · L3 Processes",
  "title": "Lecture 3 — Processes",
  "center": "Processes",
  "sub": "Lecture 3",
  "branches": [
   {
    "t": "Process Concept",
    "topic": "3-0",
    "kids": [
     {
      "t": "a program in execution",
      "k": "def",
      "note": "Program = passive file · Process = active, running",
      "d": "A process is a program while it is being executed.",
      "ar": "البرنامج ملف ساكن على الـ disk، والـ process هي البرنامج وهو شغّال."
     },
     {
      "t": "the entity to which processors are assigned",
      "k": "def"
     },
     {
      "t": "the “dispatchable” unit",
      "k": "def"
     },
     {
      "t": "the “locus of control” of a procedure in execution",
      "k": "def"
     },
     {
      "t": "job ≈ process",
      "k": "n",
      "note": "textbooks use the two terms almost interchangeably"
     },
     {
      "t": "Chrome opened twice",
      "k": "ex",
      "note": "1 program → 2 processes"
     }
    ]
   },
   {
    "t": "Process State",
    "topic": "3-1",
    "kids": [
     {
      "t": "5 states",
      "k": "cls",
      "kids": [
       {
        "t": "New",
        "k": "cls",
        "note": "the process is being created"
       },
       {
        "t": "Running",
        "k": "cls",
        "note": "instructions are being executed (has the CPU)"
       },
       {
        "t": "Waiting (blocked)",
        "k": "cls",
        "note": "waiting for some event, e.g. I/O completion"
       },
       {
        "t": "Ready",
        "k": "cls",
        "note": "waiting to be assigned to a processor (could use the CPU)"
       },
       {
        "t": "Terminated",
        "k": "cls",
        "note": "the process has finished execution"
       }
      ]
     },
     {
      "t": "Transitions (state diagram)",
      "k": "cls",
      "kids": [
       {
        "t": "new → ready",
        "k": "n",
        "note": "admitted"
       },
       {
        "t": "ready → running",
        "k": "n",
        "note": "scheduler dispatch"
       },
       {
        "t": "running → ready",
        "k": "n",
        "note": "interrupt"
       },
       {
        "t": "running → waiting",
        "k": "n",
        "note": "I/O or event wait"
       },
       {
        "t": "waiting → ready",
        "k": "n",
        "note": "I/O or event completion"
       },
       {
        "t": "running → terminated",
        "k": "n",
        "note": "exit"
       }
      ]
     },
     {
      "t": "One process may run at a time",
      "k": "exam",
      "note": "several processes may be ready or waiting"
     },
     {
      "t": "Ready list = priority order",
      "k": "exam",
      "note": "waiting list = unordered unless waiting for the same event"
     },
     {
      "t": "waiting never goes straight to running",
      "k": "warn",
      "note": "it returns to ready first"
     }
    ]
   },
   {
    "t": "Process Control Block (PCB)",
    "topic": "3-2",
    "kids": [
     {
      "t": "also called the “process descriptor”",
      "k": "def",
      "note": "data structure containing information about the process"
     },
     {
      "t": "Contains",
      "k": "cls",
      "kids": [
       {
        "t": "current state",
        "k": "n"
       },
       {
        "t": "unique identification",
        "k": "n"
       },
       {
        "t": "pointer to process’s parent",
        "k": "n"
       },
       {
        "t": "pointer to process’s child",
        "k": "n"
       },
       {
        "t": "pointers to allocated resources",
        "k": "n",
        "note": "e.g. memory range"
       },
       {
        "t": "CPU scheduling information",
        "k": "n"
       }
      ]
     },
     {
      "t": "6 items in the PCB",
      "k": "exam"
     }
    ]
   },
   {
    "t": "Process Scheduling Queues",
    "topic": "3-3",
    "kids": [
     {
      "t": "Job queue",
      "k": "def",
      "note": "set of all processes in the system"
     },
     {
      "t": "Ready queue",
      "k": "def",
      "note": "processes in main memory, ready and waiting to execute"
     },
     {
      "t": "Device queues",
      "k": "def",
      "note": "processes waiting for an I/O device"
     },
     {
      "t": "Process migration",
      "k": "n",
      "note": "processes move between the various queues"
     },
     {
      "t": "Representation of process scheduling (figure)",
      "k": "ex",
      "kids": [
       {
        "t": "ready queue → CPU",
        "k": "n"
       },
       {
        "t": "I/O request → I/O queue → I/O → back to ready",
        "k": "n"
       },
       {
        "t": "time slice expired → back to ready",
        "k": "n"
       },
       {
        "t": "fork a child → child executes → back to ready",
        "k": "n"
       },
       {
        "t": "wait for an interrupt → interrupt occurs → back to ready",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Schedulers",
    "topic": "3-3",
    "kids": [
     {
      "t": "Long-term scheduler (job scheduler)",
      "k": "def",
      "note": "selects which processes should be brought into the ready queue",
      "kids": [
       {
        "t": "invoked very infrequently (seconds, minutes) → may be slow",
        "k": "exam"
       },
       {
        "t": "controls the degree of multiprogramming",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Short-term scheduler (CPU scheduler)",
      "k": "def",
      "note": "selects which process should be executed next and allocates the CPU",
      "kids": [
       {
        "t": "invoked very frequently (milliseconds) → must be fast",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Medium-term scheduling",
      "k": "def",
      "note": "swap in / swap out partially executed processes",
      "kids": [
       {
        "t": "figure: ready queue ⇄ partially executed swapped-out processes (swap out from CPU, swap in to ready queue)",
        "k": "ex"
       }
      ]
     },
     {
      "t": "Processes are either",
      "k": "cls",
      "kids": [
       {
        "t": "I/O-bound",
        "k": "cls",
        "note": "spends more time doing I/O than computations",
        "kids": [
         {
          "t": "many short CPU bursts",
          "k": "n"
         },
         {
          "t": "Scanner",
          "k": "ex"
         }
        ]
       },
       {
        "t": "CPU-bound",
        "k": "cls",
        "note": "spends more time doing computations",
        "kids": [
         {
          "t": "few very long CPU bursts",
          "k": "n"
         },
         {
          "t": "Calculator",
          "k": "ex"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "t": "Operations on Processes",
    "topic": "3-5",
    "kids": [
     {
      "t": "These include",
      "k": "cls",
      "kids": [
       {
        "t": "create a process",
        "k": "n"
       },
       {
        "t": "destroy a process",
        "k": "n"
       },
       {
        "t": "suspend a process",
        "k": "n"
       },
       {
        "t": "resume a process",
        "k": "n"
       },
       {
        "t": "change a process’s priority",
        "k": "n"
       },
       {
        "t": "block a process",
        "k": "n"
       },
       {
        "t": "wakeup a process",
        "k": "n"
       },
       {
        "t": "dispatch a process (run on CPU)",
        "k": "n"
       },
       {
        "t": "enable a process to communicate with another (IPC)",
        "k": "n"
       }
      ]
     },
     {
      "t": "9 operations",
      "k": "exam"
     }
    ]
   },
   {
    "t": "Process Creation",
    "topic": "3-5",
    "kids": [
     {
      "t": "Creation includes",
      "k": "cls",
      "kids": [
       {
        "t": "name of the process",
        "k": "n"
       },
       {
        "t": "insert it in the system’s process table",
        "k": "n"
       },
       {
        "t": "set the process initial priority",
        "k": "n"
       },
       {
        "t": "create the PCB",
        "k": "n"
       },
       {
        "t": "allocate the process’s initial resources",
        "k": "n"
       }
      ]
     },
     {
      "t": "a process may spawn a new process",
      "k": "def",
      "kids": [
       {
        "t": "creating process = parent",
        "k": "n"
       },
       {
        "t": "created process = child",
        "k": "n"
       }
      ]
     },
     {
      "t": "hierarchical structure",
      "k": "exam",
      "note": "each child has only ONE parent · each parent may have more than one child"
     },
     {
      "t": "process tree figure",
      "k": "ex",
      "note": "A → B, C, D · B → E · C → F, G · G → H · H → I"
     },
     {
      "t": "Resource sharing (one of)",
      "k": "cls",
      "kids": [
       {
        "t": "parent and children share all resources",
        "k": "n"
       },
       {
        "t": "children share a subset of the parent’s resources",
        "k": "n"
       },
       {
        "t": "parent and child share no resources",
        "k": "n"
       }
      ]
     },
     {
      "t": "Execution",
      "k": "cls",
      "kids": [
       {
        "t": "parent and children execute concurrently",
        "k": "n"
       },
       {
        "t": "parent waits until children terminate",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Process Termination",
    "topic": "3-5",
    "kids": [
     {
      "t": "Termination includes",
      "k": "cls",
      "kids": [
       {
        "t": "removing it from the system",
        "k": "n"
       },
       {
        "t": "returning the allocated resources to the system",
        "k": "n"
       },
       {
        "t": "the PCB is erased",
        "k": "n"
       }
      ]
     },
     {
      "t": "When a parent is destroyed",
      "k": "cls",
      "kids": [
       {
        "t": "some systems destroy the spawned process automatically",
        "k": "n"
       },
       {
        "t": "other systems let it proceed independently",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Threads",
    "topic": "3-6",
    "kids": [
     {
      "t": "thread (lightweight process)",
      "k": "def",
      "note": "basic unit of CPU utilization · has its own PCB"
     },
     {
      "t": "shares with peer threads",
      "k": "cls",
      "note": "collectively known as a task",
      "kids": [
       {
        "t": "code section",
        "k": "n"
       },
       {
        "t": "data section",
        "k": "n"
       },
       {
        "t": "operating-system resources",
        "k": "n"
       }
      ]
     },
     {
      "t": "heavyweight process",
      "k": "def",
      "note": "= a task with one thread"
     },
     {
      "t": "Why threads?",
      "k": "cls",
      "kids": [
       {
        "t": "while one thread is blocked and waiting, a second thread in the same task can run",
        "k": "n"
       },
       {
        "t": "cooperation of multiple threads → higher throughput and improved performance",
        "k": "n",
        "note": "e.g. WWW pages"
       },
       {
        "t": "applications that share a common buffer benefit",
        "k": "n",
        "note": "Producer-Consumer problem"
       }
      ]
     },
     {
      "t": "Kinds",
      "k": "cls",
      "kids": [
       {
        "t": "Kernel-level threads",
        "k": "cls",
        "kids": [
         {
          "t": "Mac and OS/2",
          "k": "ex"
         }
        ]
       },
       {
        "t": "User-level threads",
        "k": "cls",
        "note": "thread library",
        "kids": [
         {
          "t": "Project Andrew from CMU",
          "k": "ex"
         },
         {
          "t": "drawback if the kernel doesn’t support threads",
          "k": "warn"
         }
        ]
       },
       {
        "t": "Hybrid approach",
        "k": "cls",
        "note": "both user-level and kernel-supported threads",
        "kids": [
         {
          "t": "Solaris 2",
          "k": "ex"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "t": "Interprocess Communication (IPC)",
    "topic": "3-7",
    "kids": [
     {
      "t": "mechanism for processes to communicate and synchronize their actions",
      "k": "def"
     },
     {
      "t": "message system",
      "k": "def",
      "note": "processes communicate without resorting to shared variables"
     },
     {
      "t": "2 operations",
      "k": "exam",
      "kids": [
       {
        "t": "send(message)",
        "k": "n",
        "note": "message size fixed or variable"
       },
       {
        "t": "receive(message)",
        "k": "n"
       }
      ]
     },
     {
      "t": "P and Q need",
      "k": "n",
      "kids": [
       {
        "t": "a communication link between them",
        "k": "n"
       },
       {
        "t": "to exchange messages via send / receive",
        "k": "n"
       }
      ]
     },
     {
      "t": "Implementation of the link",
      "k": "cls",
      "kids": [
       {
        "t": "physical",
        "k": "n",
        "note": "shared memory · hardware bus"
       },
       {
        "t": "logical",
        "k": "n",
        "note": "logical properties"
       }
      ]
     },
     {
      "t": "Logical IPC choices",
      "k": "cls",
      "kids": [
       {
        "t": "direct or indirect communication",
        "k": "n"
       },
       {
        "t": "symmetric or asymmetric communication",
        "k": "n"
       },
       {
        "t": "automatic or explicit buffering",
        "k": "n"
       },
       {
        "t": "send by copy or send by reference",
        "k": "n"
       },
       {
        "t": "fixed size or variable size message",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Direct Communication",
    "topic": "3-8",
    "kids": [
     {
      "t": "processes must name each other explicitly",
      "k": "def",
      "kids": [
       {
        "t": "send(P, message)",
        "k": "n",
        "note": "send a message to process P"
       },
       {
        "t": "receive(Q, message)",
        "k": "n",
        "note": "receive a message from process Q"
       }
      ]
     },
     {
      "t": "Properties of the link",
      "k": "cls",
      "kids": [
       {
        "t": "links are established automatically",
        "k": "n"
       },
       {
        "t": "a link is associated with exactly one pair of processes",
        "k": "exam"
       },
       {
        "t": "between each pair there exists exactly one link",
        "k": "exam"
       },
       {
        "t": "may be unidirectional, but is usually bi-directional",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Indirect Communication",
    "topic": "3-8",
    "kids": [
     {
      "t": "messages are directed and received from mailboxes",
      "k": "def",
      "note": "also referred to as ports",
      "kids": [
       {
        "t": "each mailbox has a unique ID",
        "k": "n"
       },
       {
        "t": "processes can communicate only if they share a mailbox",
        "k": "n"
       }
      ]
     },
     {
      "t": "Properties of the link",
      "k": "cls",
      "kids": [
       {
        "t": "established only if processes share a common mailbox",
        "k": "n"
       },
       {
        "t": "a link may be associated with many processes",
        "k": "exam"
       },
       {
        "t": "each pair may share several communication links",
        "k": "exam"
       },
       {
        "t": "may be unidirectional or bi-directional",
        "k": "n"
       }
      ]
     },
     {
      "t": "Operations",
      "k": "cls",
      "kids": [
       {
        "t": "create a new mailbox",
        "k": "n"
       },
       {
        "t": "send and receive messages through the mailbox",
        "k": "n"
       },
       {
        "t": "destroy a mailbox",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Buffering",
    "topic": "3-9",
    "kids": [
     {
      "t": "queue of messages attached to the link",
      "k": "def",
      "note": "implemented in one of three ways"
     },
     {
      "t": "1. Zero capacity",
      "k": "cls",
      "note": "0 messages",
      "kids": [
       {
        "t": "sender must wait for the receiver",
        "k": "exam"
       }
      ]
     },
     {
      "t": "2. Bounded capacity",
      "k": "cls",
      "note": "finite length of n messages",
      "kids": [
       {
        "t": "sender must wait if the link is full",
        "k": "exam"
       }
      ]
     },
     {
      "t": "3. Unbounded capacity",
      "k": "cls",
      "note": "infinite length",
      "kids": [
       {
        "t": "sender never waits",
        "k": "exam"
       }
      ]
     }
    ]
   }
  ]
 },
 "l4": {
  "id": "l4",
  "tab": "OS · L4 CPU Scheduling",
  "title": "Lecture 4 — CPU Scheduling",
  "center": "CPU Scheduling",
  "sub": "Lecture 4",
  "branches": [
   {
    "t": "Basic Concepts",
    "topic": "4-0",
    "kids": [
     {
      "t": "CPU scheduling is the basis of multi-programmed OS’s",
      "k": "def"
     },
     {
      "t": "goal of scheduling",
      "k": "exam",
      "note": "maximize CPU utilization"
     },
     {
      "t": "process cycles",
      "k": "def",
      "note": "a process alternates between CPU usage and I/O usage",
      "kids": [
       {
        "t": "the execution cycle begins with a CPU burst",
        "k": "n"
       },
       {
        "t": "the I/O cycle begins with an I/O burst",
        "k": "n"
       }
      ]
     },
     {
      "t": "Sequence of CPU and I/O bursts (figure)",
      "k": "ex",
      "note": "CPU burst → wait for I/O → CPU burst → wait for I/O …"
     }
    ]
   },
   {
    "t": "CPU Burst Times",
    "topic": "4-1",
    "kids": [
     {
      "t": "frequency of CPU bursts has been extensively measured",
      "k": "n"
     },
     {
      "t": "frequency graph is",
      "k": "cls",
      "kids": [
       {
        "t": "exponential or hyper exponential",
        "k": "exam"
       }
      ]
     },
     {
      "t": "several short bursts and a few longer bursts",
      "k": "exam"
     },
     {
      "t": "Histogram of CPU-burst times",
      "k": "ex",
      "note": "x: burst duration in ms · y: frequency"
     }
    ]
   },
   {
    "t": "Preemptive vs. Nonpreemptive",
    "topic": "4-2",
    "kids": [
     {
      "t": "Nonpreemptive",
      "k": "cls",
      "note": "once a process has the CPU, the CPU can’t be taken from it",
      "kids": [
       {
        "t": "short jobs wait for long jobs, but treatment of all processes is fair",
        "k": "n"
       },
       {
        "t": "response time is more predictable",
        "k": "n",
        "note": "incoming high-priority jobs can’t displace waiting jobs"
       }
      ]
     },
     {
      "t": "Preemptive",
      "k": "cls",
      "note": "the CPU can be taken away",
      "kids": [
       {
        "t": "useful when high-priority processes require rapid attention",
        "k": "n"
       },
       {
        "t": "many processes must be kept in primary memory so the next ready process is available when the CPU is free",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Scheduling Levels",
    "topic": "4-3",
    "kids": [
     {
      "t": "High-level scheduling",
      "k": "cls",
      "note": "job scheduling or admission scheduling",
      "kids": [
       {
        "t": "determines which job will gain admission to the system",
        "k": "n"
       },
       {
        "t": "once admitted, a job becomes a process or groups of processes",
        "k": "n"
       }
      ]
     },
     {
      "t": "Intermediate-level scheduling",
      "k": "cls",
      "kids": [
       {
        "t": "determines which processes shall compete for the CPU",
        "k": "n"
       },
       {
        "t": "responds to short-term fluctuations by suspending and resuming processes",
        "k": "n"
       },
       {
        "t": "acts as a buffer between admission of jobs and assigning the CPU",
        "k": "n"
       }
      ]
     },
     {
      "t": "Low-level scheduling",
      "k": "cls",
      "note": "dispatch the CPU to the process",
      "kids": [
       {
        "t": "determines which process gets the CPU when it next becomes available",
        "k": "n"
       },
       {
        "t": "performed by the dispatcher — many times per second",
        "k": "n"
       },
       {
        "t": "dispatcher must reside in primary storage at all times",
        "k": "n"
       },
       {
        "t": "dispatch latency",
        "k": "def",
        "note": "time for the dispatcher to stop one process and start another"
       }
      ]
     },
     {
      "t": "Figure (flow)",
      "k": "ex",
      "note": "waiting for entry → waiting for initiation → suspended ⇄ active → running → completed"
     }
    ]
   },
   {
    "t": "Scheduling Criteria",
    "topic": "4-4",
    "kids": [
     {
      "t": "CPU utilization",
      "k": "def",
      "note": "keep the CPU as busy as possible",
      "kids": [
       {
        "t": "Max",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Throughput",
      "k": "def",
      "note": "number of processes that complete execution per time unit",
      "kids": [
       {
        "t": "Max",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Turnaround time",
      "k": "def",
      "note": "amount of time to execute a particular process",
      "kids": [
       {
        "t": "Min",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Waiting time",
      "k": "def",
      "note": "amount of time a process has been waiting in the ready queue",
      "kids": [
       {
        "t": "Min",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Response time",
      "k": "def",
      "note": "time from request submission until the first response is produced, not output (time-sharing)",
      "kids": [
       {
        "t": "Min",
        "k": "exam"
       }
      ]
     }
    ]
   },
   {
    "t": "Priorities",
    "topic": "4-5",
    "kids": [
     {
      "t": "assigned automatically by the system or externally",
      "k": "n"
     },
     {
      "t": "may be earned or may be bought",
      "k": "n"
     },
     {
      "t": "Static priorities",
      "k": "cls",
      "kids": [
       {
        "t": "can’t be changed",
        "k": "n"
       },
       {
        "t": "easy to implement",
        "k": "n"
       },
       {
        "t": "no response to external changes",
        "k": "n"
       }
      ]
     },
     {
      "t": "Dynamic priorities",
      "k": "cls",
      "kids": [
       {
        "t": "can be changed even after a short duration",
        "k": "n"
       },
       {
        "t": "complex implementation",
        "k": "n"
       },
       {
        "t": "responsive to external changes",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Scheduling Algorithms",
    "topic": "4-6",
    "kids": [
     {
      "t": "the 8 algorithms",
      "k": "cls",
      "kids": [
       {
        "t": "Deadline Scheduling",
        "k": "n"
       },
       {
        "t": "First-Come, First-Served (FCFS)",
        "k": "n"
       },
       {
        "t": "Round Robin (RR)",
        "k": "n"
       },
       {
        "t": "Shortest-Job-First (SJF)",
        "k": "n",
        "note": "written SJR on the slide"
       },
       {
        "t": "Priority Scheduling",
        "k": "n"
       },
       {
        "t": "Multilevel Feedback Queue",
        "k": "n"
       },
       {
        "t": "Multiple-Processor Scheduling",
        "k": "n"
       },
       {
        "t": "Real-Time Scheduling",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Deadline Scheduling",
    "topic": "4-6",
    "kids": [
     {
      "t": "jobs are scheduled to be completed by a specific time or deadline",
      "k": "def"
     },
     {
      "t": "delivered on time → very high priority",
      "k": "n"
     },
     {
      "t": "delivered after the deadline → worthless",
      "k": "warn"
     },
     {
      "t": "very complex because",
      "k": "cls",
      "kids": [
       {
        "t": "user must supply precise resource requirements in advance (rare)",
        "k": "n"
       },
       {
        "t": "system must run the job without severely degrading other users",
        "k": "n"
       },
       {
        "t": "system must plan its resources through to the deadline",
        "k": "n"
       },
       {
        "t": "many active deadline jobs make scheduling very complex",
        "k": "n"
       },
       {
        "t": "needs intensive resource management",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "First-Come, First-Served (FCFS)",
    "topic": "4-7",
    "kids": [
     {
      "t": "processes are dispatched according to arrival time",
      "k": "def",
      "note": "also called FIFO"
     },
     {
      "t": "fair in formal sense, unfair to short jobs waiting for long jobs",
      "k": "n"
     },
     {
      "t": "nonpreemptive discipline",
      "k": "exam"
     },
     {
      "t": "rarely used as a master scheme",
      "k": "n",
      "note": "may cooperate with another scheme"
     },
     {
      "t": "(P1,24) (P2,3) (P3,3) in order P1,P2,P3",
      "k": "ex",
      "kids": [
       {
        "t": "Gantt: P1 0–24 · P2 24–27 · P3 27–30",
        "k": "n"
       },
       {
        "t": "waiting: P1=0 · P2=24 · P3=27",
        "k": "n"
       },
       {
        "t": "average waiting = (0+24+27)/3 = 17",
        "k": "exam"
       }
      ]
     },
     {
      "t": "same processes, order P2,P3,P1",
      "k": "ex",
      "kids": [
       {
        "t": "Gantt: P2 0–3 · P3 3–6 · P1 6–30",
        "k": "n"
       },
       {
        "t": "waiting: P1=6 · P2=0 · P3=3",
        "k": "n"
       },
       {
        "t": "average waiting = (6+0+3)/3 = 3",
        "k": "exam",
        "note": "much better"
       }
      ]
     },
     {
      "t": "FCFS can’t guarantee good response time",
      "k": "warn"
     }
    ]
   },
   {
    "t": "Round Robin (RR)",
    "topic": "4-8",
    "kids": [
     {
      "t": "each process gets a small unit of CPU time",
      "k": "def",
      "note": "time-slice or quantum — usually 10–100 ms"
     },
     {
      "t": "time expired before finishing → preempted and added to the end of the ready queue",
      "k": "n"
     },
     {
      "t": "n processes, quantum q → each gets 1/n of the CPU",
      "k": "exam",
      "note": "no process waits more than (n−1)q"
     },
     {
      "t": "Performance",
      "k": "cls",
      "kids": [
       {
        "t": "q large → FIFO",
        "k": "n"
       },
       {
        "t": "q small → must be large relative to context switch, else overhead is too high",
        "k": "n"
       }
      ]
     },
     {
      "t": "effective in time-sharing · guarantees reasonable response time · preemption overhead kept low",
      "k": "n"
     },
     {
      "t": "quantum = 20 · (P1,53) (P2,17) (P3,68) (P4,24)",
      "k": "ex",
      "kids": [
       {
        "t": "Gantt: P1 0–20 · P2 20–37 · P3 37–57 · P4 57–77 · P1 77–97 · P3 97–117 · P4 117–121 · P1 121–134 · P3 134–154 · P3 154–162",
        "k": "n"
       }
      ]
     },
     {
      "t": "smaller quantum → more context switches → more overhead",
      "k": "warn",
      "note": "process time = 10: q=12 → 0 switches · q=6 → 1 · q=1 → 9"
     }
    ]
   },
   {
    "t": "Shortest-Job-First (SJF) & SRTF",
    "topic": "4-9",
    "kids": [
     {
      "t": "the waiting process with the smallest estimated run-time-to-completion runs next",
      "k": "def"
     },
     {
      "t": "Two schemes",
      "k": "cls",
      "kids": [
       {
        "t": "Nonpreemptive",
        "k": "cls",
        "note": "cannot be preempted until it completes its CPU burst"
       },
       {
        "t": "Preemptive = SRTF",
        "k": "cls",
        "note": "new process with burst < remaining time preempts",
        "kids": [
         {
          "t": "Shortest-Remaining-Time-First",
          "k": "n"
         }
        ]
       }
      ]
     },
     {
      "t": "SJF is optimal",
      "k": "exam",
      "note": "minimum average waiting time for a given set of processes"
     },
     {
      "t": "lower average turnaround than RR, but longer response",
      "k": "n"
     },
     {
      "t": "P1(0.0,7) P2(2.0,4) P3(4.0,1) P4(5.0,4)",
      "k": "ex",
      "note": "arrival, burst",
      "kids": [
       {
        "t": "non-preemptive: P1 0–7 · P3 7–8 · P2 8–12 · P4 12–16",
        "k": "n"
       },
       {
        "t": "average waiting = (0+6+3+7)/4 = 4",
        "k": "exam"
       },
       {
        "t": "SRTF: P1 0–2 · P2 2–4 · P3 4–5 · P2 5–7 · P4 7–11 · P1 11–16",
        "k": "n"
       },
       {
        "t": "average waiting = (9+1+0+2)/4 = 3",
        "k": "exam"
       }
      ]
     }
    ]
   },
   {
    "t": "Priority Scheduling",
    "topic": "4-10",
    "kids": [
     {
      "t": "a priority number (integer) is associated with each process",
      "k": "def"
     },
     {
      "t": "smallest integer = highest priority",
      "k": "exam"
     },
     {
      "t": "can be preemptive or nonpreemptive",
      "k": "n"
     },
     {
      "t": "SJF is a priority scheduling",
      "k": "n",
      "note": "priority = predicted next CPU burst time"
     },
     {
      "t": "Problem: starvation",
      "k": "warn",
      "note": "low-priority processes may never execute"
     },
     {
      "t": "Solution: aging",
      "k": "exam",
      "note": "as time progresses, increase the priority of the process"
     }
    ]
   },
   {
    "t": "Multilevel Queue",
    "topic": "4-11",
    "kids": [
     {
      "t": "ready queue is partitioned into separate queues",
      "k": "def",
      "kids": [
       {
        "t": "foreground (interactive)",
        "k": "n",
        "note": "RR"
       },
       {
        "t": "background (batch)",
        "k": "n",
        "note": "FCFS"
       }
      ]
     },
     {
      "t": "each queue has its own scheduling algorithm",
      "k": "n"
     },
     {
      "t": "scheduling between the queues",
      "k": "cls",
      "kids": [
       {
        "t": "Fixed priority scheduling",
        "k": "cls",
        "note": "serve all from foreground, then background",
        "kids": [
         {
          "t": "possibility of starvation",
          "k": "warn"
         }
        ]
       },
       {
        "t": "Time slice",
        "k": "cls",
        "note": "each queue gets a certain amount of CPU time",
        "kids": [
         {
          "t": "80% to foreground (RR) · 20% to background (FCFS)",
          "k": "ex"
         }
        ]
       }
      ]
     },
     {
      "t": "Figure: highest → lowest priority",
      "k": "ex",
      "note": "system · interactive · interactive editing · batch · student processes"
     }
    ]
   },
   {
    "t": "Multilevel Feedback Queue",
    "topic": "4-12",
    "kids": [
     {
      "t": "a process can move between the various queues",
      "k": "def",
      "note": "aging can be implemented this way"
     },
     {
      "t": "defined by these parameters",
      "k": "cls",
      "kids": [
       {
        "t": "number of queues",
        "k": "n"
       },
       {
        "t": "scheduling algorithm for each queue",
        "k": "n"
       },
       {
        "t": "method to determine when to upgrade a process",
        "k": "n"
       },
       {
        "t": "method to determine when to demote a process",
        "k": "n"
       },
       {
        "t": "method to determine which queue a process enters when it needs service",
        "k": "n"
       }
      ]
     },
     {
      "t": "three queues",
      "k": "ex",
      "kids": [
       {
        "t": "Q0 — time quantum 8 ms",
        "k": "n"
       },
       {
        "t": "Q1 — time quantum 16 ms",
        "k": "n"
       },
       {
        "t": "Q2 — FCFS",
        "k": "n"
       }
      ]
     },
     {
      "t": "how a job flows",
      "k": "cls",
      "kids": [
       {
        "t": "new job enters Q0 → receives 8 ms",
        "k": "n"
       },
       {
        "t": "not finished → moved to Q1 → 16 additional ms",
        "k": "n"
       },
       {
        "t": "still not complete → preempted and moved to Q2",
        "k": "exam"
       }
      ]
     }
    ]
   },
   {
    "t": "Multiple-Processor Scheduling",
    "topic": "4-13",
    "kids": [
     {
      "t": "CPU scheduling is more complex when multiple CPUs are available",
      "k": "def"
     },
     {
      "t": "Homogeneous system",
      "k": "cls",
      "note": "processes are identical in terms of functionality",
      "kids": [
       {
        "t": "can processes run on any processor?",
        "k": "n"
       }
      ]
     },
     {
      "t": "Heterogeneous system",
      "k": "cls",
      "kids": [
       {
        "t": "programs must be compiled for the instructions of the proper processors",
        "k": "n"
       }
      ]
     },
     {
      "t": "Load sharing",
      "k": "def",
      "note": "= load balancing",
      "kids": [
       {
        "t": "a queue for each processor",
        "k": "cls",
        "kids": [
         {
          "t": "Self-Scheduling = Symmetric Multiprocessing",
          "k": "exam"
         }
        ]
       },
       {
        "t": "a common ready queue for all processors, accessed by one processor",
        "k": "cls",
        "kids": [
         {
          "t": "Master-Slave = Asymmetric Multiprocessing",
          "k": "exam"
         },
         {
          "t": "alleviates the need for data sharing",
          "k": "n"
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "t": "Real-Time Scheduling",
    "topic": "4-14",
    "kids": [
     {
      "t": "Hard real-time systems",
      "k": "cls",
      "kids": [
       {
        "t": "must know the exact time for each task",
        "k": "n"
       },
       {
        "t": "scheduling pre-determined or by resource reservation",
        "k": "n"
       },
       {
        "t": "resource reservation",
        "k": "def",
        "note": "the task tries to reserve resources before starting",
        "kids": [
         {
          "t": "rejected if the resources are not available",
          "k": "warn"
         }
        ]
       }
      ]
     },
     {
      "t": "Soft real-time systems",
      "k": "cls",
      "kids": [
       {
        "t": "real-time processes are given priority over other processes",
        "k": "n"
       },
       {
        "t": "must have small dispatch latency",
        "k": "n",
        "note": "usually implemented by preemption"
       }
      ]
     }
    ]
   }
  ]
 },
 "c5": {
  "id": "c5",
  "tab": "Stats · Ch 5 Joint",
  "title": "Chapter 5 — Bivariate (Joint) Distributions",
  "center": "Joint Distributions",
  "sub": "Chapter 5",
  "branches": [
   {
    "t": "The Big Idea",
    "sec": "a1",
    "kids": [
     {
      "t": "Two random variables at once",
      "k": "n",
      "note": "height and weight, hours studied and grade",
      "d": "Their joint behavior lives in a table: each cell is the probability of a pair.",
      "ar": "الـ joint table فيه كل خانة = احتمال الاتنين مع بعض، ومجموع كل الخانات = 1."
     },
     {
      "t": "Joint p.m.f.",
      "k": "def",
      "note": "h(x,y) = P(X = x, Y = y)"
     },
     {
      "t": "Valid if",
      "k": "exam",
      "note": "h(x,y) ≥ 0 for all pairs and ΣΣ h(x,y) = 1"
     },
     {
      "t": "Example 5.1",
      "k": "ex",
      "note": "h(x,y) = kxy for x, y ∈ {1,2,3}",
      "kids": [
       {
        "t": "36k = k(1+2+3)² = 1, so k = 1/36",
        "k": "n"
       },
       {
        "t": "P(X+Y ≥ 4) = 1 − [h(1,1)+h(1,2)+h(2,1)] = 1 − 5/36 = 31/36",
        "k": "n"
       }
      ]
     },
     {
      "t": "Continuous case",
      "k": "def",
      "note": "joint p.d.f. f(x,y) ≥ 0 with total volume 1 under the surface",
      "d": "Probabilities are double integrals over a region."
     }
    ]
   },
   {
    "t": "Joint Table Lab",
    "sec": "a2",
    "kids": [
     {
      "t": "Edit any cell, or load an example",
      "k": "n",
      "kids": [
       {
        "t": "Ex 5.2 books",
        "k": "n"
       },
       {
        "t": "Ex 5.1 (h = xy/36)",
        "k": "n"
       },
       {
        "t": "Exercise [5]",
        "k": "n"
       },
       {
        "t": "add or remove X / Y values",
        "k": "n"
       }
      ]
     },
     {
      "t": "The lab computes",
      "k": "n",
      "kids": [
       {
        "t": "marginals",
        "k": "n"
       },
       {
        "t": "conditionals (X given Y, Y given X)",
        "k": "n"
       },
       {
        "t": "independence test",
        "k": "n"
       },
       {
        "t": "covariance and correlation",
        "k": "n"
       }
      ]
     },
     {
      "t": "The covariance picture",
      "k": "def",
      "note": "bubble size = probability; dashed lines = μX and μY",
      "kids": [
       {
        "t": "Green quadrants (both above or both below the means)",
        "k": "n",
        "note": "push cov positive"
       },
       {
        "t": "Red quadrants",
        "k": "warn",
        "note": "push cov negative"
       }
      ]
     }
    ]
   },
   {
    "t": "Marginal and Conditional",
    "sec": "a3",
    "kids": [
     {
      "t": "Marginal = the table's margins",
      "k": "def",
      "note": "add over the other variable",
      "d": "gX(x) = Σy h(x,y) and gY(y) = Σx h(x,y).",
      "ar": "marginal = اجمع الصف أو العمود."
     },
     {
      "t": "Conditional = slice, then rescale",
      "k": "def",
      "note": "take one row and divide by its total so it sums to 1",
      "d": "f(x | y) = h(x,y) / gY(y)",
      "ar": "conditional = خد صف واحد وقسمه على مجموعه."
     },
     {
      "t": "Continuous",
      "k": "n",
      "note": "sums become integrals",
      "kids": [
       {
        "t": "fX(x) = ∫ f(x,y) dy",
        "k": "n"
       },
       {
        "t": "f(x|y) = f(x,y)/fY(y)",
        "k": "n"
       }
      ]
     },
     {
      "t": "Example 5.4 / 5.6",
      "k": "ex",
      "note": "from the books table",
      "kids": [
       {
        "t": "gX = (5/14, 15/28, 3/28)",
        "k": "n"
       },
       {
        "t": "gY = (15/28, 3/7, 1/28)",
        "k": "n"
       },
       {
        "t": "Given Y = 1: f(0|1) = (3/14)/(3/7) = 1/2, f(1|1) = 1/2, f(2|1) = 0",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Independence",
    "sec": "a4",
    "kids": [
     {
      "t": "Discrete",
      "k": "exam",
      "note": "X, Y independent ⟺ h(x,y) = gX(x)·gY(y) for every cell"
     },
     {
      "t": "Continuous",
      "k": "exam",
      "note": "f(x,y) = fX(x)·fY(y) for all x, y"
     },
     {
      "t": "One failing cell is enough to prove dependent",
      "k": "exam",
      "kids": [
       {
        "t": "Example 5.8",
        "k": "ex",
        "note": "h(0,0) = 3/28, but gX(0)·gY(0) = (5/14)(15/28) = 75/392 ≠ 42/392"
       }
      ]
     },
     {
      "t": "Continuous: support not a rectangle",
      "k": "warn",
      "note": "like the triangle x+y < 1 → the variables are dependent"
     },
     {
      "t": "Load \"Ex 5.1\" in the Lab",
      "k": "ex",
      "note": "xy/36 factors as (x/6)(y/6), so independent"
     }
    ]
   },
   {
    "t": "Expectation, Covariance, Correlation",
    "sec": "a5",
    "kids": [
     {
      "t": "E[g(X,Y)] = ΣΣ g(x,y) h(x,y)",
      "k": "def"
     },
     {
      "t": "E[XY] = ΣΣ xy·h(x,y)",
      "k": "def"
     },
     {
      "t": "cov(X,Y) = E[XY] − μXμY",
      "k": "def"
     },
     {
      "t": "ρ = cov(X,Y)/(σXσY)",
      "k": "def",
      "note": "−1 ≤ ρ ≤ 1",
      "d": "ρ is cov rescaled to be unitless, so it is the better measure of linear relationship."
     },
     {
      "t": "Sign of covariance",
      "k": "cls",
      "kids": [
       {
        "t": "cov > 0",
        "k": "n",
        "note": "X and Y tend to be high together or low together"
       },
       {
        "t": "cov < 0",
        "k": "n",
        "note": "one high, the other low"
       }
      ]
     },
     {
      "t": "Independent ⟹ E[XY] = E[X]E[Y] ⟹ cov = 0",
      "k": "exam",
      "ar": "independent تدي cov = 0، بس cov = 0 مش معناها independent.",
      "kids": [
       {
        "t": "The reverse is false",
        "k": "warn",
        "note": "zero covariance does not prove independence"
       }
      ]
     },
     {
      "t": "Properties",
      "k": "cls",
      "kids": [
       {
        "t": "cov(X,c) = 0",
        "k": "n"
       },
       {
        "t": "cov(X,X) = Var(X)",
        "k": "n"
       },
       {
        "t": "cov(X, aY+b) = a·cov(X,Y)",
        "k": "n"
       }
      ]
     },
     {
      "t": "Example 5.10 (books)",
      "k": "ex",
      "note": "E[X] = 3/4, E[Y] = 1/2, E[XY] = 3/14",
      "kids": [
       {
        "t": "cov = 3/14 − 3/8 = −9/56",
        "k": "n"
       },
       {
        "t": "Var(X) = 45/112, Var(Y) = 9/28",
        "k": "n"
       },
       {
        "t": "ρ = −0.447",
        "k": "exam"
       }
      ]
     }
    ]
   },
   {
    "t": "Sums and Linear Combinations",
    "sec": "a6",
    "kids": [
     {
      "t": "E(aX + bY) = aE(X) + bE(Y)",
      "k": "def"
     },
     {
      "t": "Var(aX + bY) = a²Var(X) + b²Var(Y) + 2ab·cov(X,Y)",
      "k": "def"
     },
     {
      "t": "Uncorrelated or independent",
      "k": "exam",
      "note": "the cov term vanishes and variances add"
     },
     {
      "t": "Special cases",
      "k": "cls",
      "kids": [
       {
        "t": "Var(X+Y) = VarX + VarY + 2cov",
        "k": "n"
       },
       {
        "t": "Var(X−Y) = VarX + VarY − 2cov",
        "k": "n"
       },
       {
        "t": "cov(X−Y, X+Y) = VarX − VarY",
        "k": "n"
       }
      ]
     },
     {
      "t": "Constants added never change a variance or a covariance",
      "k": "warn",
      "note": "the +5 in 3X − 2Y + 5"
     },
     {
      "t": "General covariance",
      "k": "def",
      "note": "cov(a₁X + a₂Y, b₁X + b₂Y) = a₁b₁VarX + (a₁b₂ + a₂b₁)cov + a₂b₂VarY"
     },
     {
      "t": "Calculator: variances and covariance of combinations",
      "k": "n",
      "note": "enter Var(X), Var(Y), cov(X,Y); pick U = X + Y, V = X + Y"
     },
     {
      "t": "Example 5.13",
      "k": "ex",
      "note": "Var X=1, Var Y=5, Var Z=2, cov(X,Y)=−2, cov(X,Z)=−1, cov(Y,Z)=0",
      "kids": [
       {
        "t": "Var(3X − Y + 2Z) = 9(1) + 5 + 4(2) + 2(−3·(−2) + 6·(−1) + 0) = 22",
        "k": "n"
       },
       {
        "t": "cov(X−2Y+3Z, −2X+3Y+4Z) = −20",
        "k": "n"
       },
       {
        "t": "Your notes print −14",
        "k": "warn",
        "note": "the same expansion gives −20; ask your instructor to confirm"
       }
      ]
     }
    ]
   },
   {
    "t": "The Continuous Case",
    "sec": "a7",
    "kids": [
     {
      "t": "Valid joint p.d.f.",
      "k": "def",
      "note": "f ≥ 0 and ∬ f dx dy = 1"
     },
     {
      "t": "Draw the region first",
      "k": "exam",
      "kids": [
       {
        "t": "Sketch the region",
        "k": "n",
        "note": "for x > 0, y > 0, x+y < 1 it is a triangle"
       },
       {
        "t": "Write the limits from the picture",
        "k": "n",
        "note": "x from 0 to 1−y, y from 0 to 1"
       },
       {
        "t": "Integrate",
        "k": "warn",
        "note": "most mistakes come from wrong limits"
       }
      ]
     },
     {
      "t": "Example 5.3",
      "k": "ex",
      "note": "f = kxy on the triangle",
      "kids": [
       {
        "t": "∫₀¹∫₀^{1−y} kxy dx dy = k∫₀¹ y(1−y)²/2 dy = k/24, so k = 24",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Marginals (5.5)",
      "k": "ex",
      "kids": [
       {
        "t": "fX(x) = ∫₀^{1−x} 24xy dy = 12x(1−x)²",
        "k": "n"
       },
       {
        "t": "likewise fY(y) = 12y(1−y)²",
        "k": "n"
       }
      ]
     },
     {
      "t": "Conditional (5.7)",
      "k": "ex",
      "note": "f(x|y) = 24xy/(12y(1−y)²) = 2x/(1−y)², 0 < x < 1−y",
      "kids": [
       {
        "t": "For y = ¼: f(x|¼) = 32x/9 on (0, ¾)",
        "k": "n"
       },
       {
        "t": "P(X > ½ | Y = ¼) = ∫½¾ 32x/9 dx = 5/9",
        "k": "n"
       }
      ]
     },
     {
      "t": "Dependent because the support is a triangle",
      "k": "warn",
      "note": "f ≠ fX·fY; also E[XY] = 2/15"
     }
    ]
   },
   {
    "t": "MCQ Quiz and Exercises",
    "sec": "a8",
    "kids": [
     {
      "t": "MCQ Quiz",
      "k": "n",
      "note": "24 questions, one at a time, with a score"
     },
     {
      "t": "Exercises [1]–[4] with answers",
      "k": "ex",
      "note": "answers were checked numerically",
      "kids": [
       {
        "t": "[1] chips: 4 red, 3 white, 2 blue; draw 3 without replacement",
        "k": "ex",
        "note": "h(x,y) = C(3,x)·C(2,y)·C(4, 3−x−y) / C(9,3)",
        "d": "x = 0..3, y = 0..2, x + y ≤ 3"
       },
       {
        "t": "[2] h = c(x²+y²)",
        "k": "ex",
        "note": "Σ(x²+y²) = 89 → c = 1/89",
        "kids": [
         {
          "t": "gX: 17/89, 14/89, 17/89, 41/89",
          "k": "n"
         },
         {
          "t": "gY: 15/89, 27/89, 47/89",
          "k": "n"
         },
         {
          "t": "E[X] = 123/89, E[Y] = 180/89, E[XY] = 210/89",
          "k": "n"
         },
         {
          "t": "cov = −3450/7921 ≈ −0.436, ρ ≈ −0.188",
          "k": "exam"
         }
        ]
       },
       {
        "t": "[3] f = kx(x−y), 0<x<1, |y|<x",
        "k": "ex",
        "note": "∫₀¹ x·2x² dx = 1/2",
        "kids": [
         {
          "t": "k = 2",
          "k": "exam"
         }
        ]
       },
       {
        "t": "[3 second version] f = k(x−y)",
        "k": "ex",
        "note": "∫₀¹∫₋ₓˣ (x−y) dy dx = 2/3",
        "kids": [
         {
          "t": "k = 3/2",
          "k": "exam"
         },
         {
          "t": "E[X] = 3/4, E[Y] = −1/4, E[XY] = −1/5 → cov(X,Y) = −1/80",
          "k": "n"
         },
         {
          "t": "cov(3X+7, 2Y+3) = 6·cov = −3/40",
          "k": "exam"
         }
        ]
       },
       {
        "t": "[4] f = k on 0<y<x<2",
        "k": "ex",
        "note": "triangle area = 2",
        "kids": [
         {
          "t": "k = 1/2",
          "k": "exam"
         },
         {
          "t": "E[X] = 4/3, E[Y] = 2/3, E[XY] = 1 → cov = 1/9",
          "k": "n"
         },
         {
          "t": "cov(3X−7, 2Y+3) = 6/9 = 2/3",
          "k": "exam"
         }
        ]
       }
      ]
     }
    ]
   }
  ]
 },
 "c6": {
  "id": "c6",
  "tab": "Stats · Ch 6 Sampling",
  "title": "Chapter 6 — Sampling Distributions",
  "center": "Sampling Distributions",
  "sub": "Chapter 6",
  "branches": [
   {
    "t": "The Big Idea",
    "sec": "s1",
    "kids": [
     {
      "t": "Soup analogy",
      "k": "ex",
      "note": "one spoonful (sample) judges the whole pot (population)",
      "d": "You can't drink the whole pot, so you take one spoonful to judge it. Every spoonful tastes a little different, so any number computed from a sample, like X̄, changes from sample to sample."
     },
     {
      "t": "Population",
      "k": "def",
      "note": "everything you want to learn about"
     },
     {
      "t": "Parameter",
      "k": "def",
      "note": "a fixed, unknown number of the population (μ, σ²)"
     },
     {
      "t": "Random sample",
      "k": "def",
      "note": "X₁,…,Xₙ independent, from the same distribution"
     },
     {
      "t": "Statistic",
      "k": "def",
      "note": "a number computed from the sample, with no unknown parameter (X̄, S²)"
     },
     {
      "t": "A statistic is a random variable",
      "k": "exam",
      "note": "its distribution is called a sampling distribution",
      "ar": "الـ statistic (زي X̄) بيتغير من عينة لعينة، فليه distribution. الفصل ده بيقولك شكل الـ distribution ده إيه."
     },
     {
      "t": "The chapter has only 4 results",
      "k": "exam",
      "kids": [
       {
        "t": "X̄ → Normal",
        "k": "def"
       },
       {
        "t": "(n−1)S²/σ² → χ²",
        "k": "def"
       },
       {
        "t": "(X̄−μ)/(S/√n) → t",
        "k": "def"
       },
       {
        "t": "ratio of variances → F",
        "k": "def"
       }
      ]
     }
    ]
   },
   {
    "t": "The Sample Mean X̄ and the CLT",
    "sec": "s2",
    "kids": [
     {
      "t": "Intuition",
      "k": "n",
      "note": "one person's weight is noisy, the average of 100 people is stable",
      "d": "More data → less spread."
     },
     {
      "t": "E(X̄) = μ",
      "k": "def"
     },
     {
      "t": "Var(X̄) = σ²/n",
      "k": "def"
     },
     {
      "t": "sd(X̄) = σ/√n",
      "k": "def"
     },
     {
      "t": "Z = (X̄ − μ)/(σ/√n) ~ N(0,1)",
      "k": "def",
      "note": "standardize first"
     },
     {
      "t": "Normal population",
      "k": "exam",
      "kids": [
       {
        "t": "X̄ is exactly normal for any n",
        "k": "exam",
        "note": "Theorem 6.1"
       }
      ]
     },
     {
      "t": "Any population, n ≥ 30",
      "k": "exam",
      "kids": [
       {
        "t": "X̄ is approximately normal",
        "k": "exam",
        "note": "Central Limit Theorem"
       }
      ]
     },
     {
      "t": "σ unknown and n large",
      "k": "n",
      "note": "use S instead of σ"
     },
     {
      "t": "Two samples",
      "k": "exam",
      "note": "variances always add",
      "kids": [
       {
        "t": "Var(X̄₁ − X̄₂) = σ₁²/n₁ + σ₂²/n₂",
        "k": "def"
       }
      ]
     },
     {
      "t": "Try it: watch the CLT happen",
      "k": "n",
      "note": "Exponential, n = 1, then 5, 30, 100",
      "d": "The bars become a narrow bell curve even though the population is skewed. The page lab lets you pick Normal, Uniform, Exponential (skewed) or Bimodal and take 1 or 1000 samples."
     },
     {
      "t": "Example 6.1",
      "k": "ex",
      "note": "μ = 900, σ = 50, n = 64: find P(895 < X̄ < 910)",
      "kids": [
       {
        "t": "sd(X̄) = 50/√64 = 6.25",
        "k": "n"
       },
       {
        "t": "z₁ = (895−900)/6.25 = −0.8,  z₂ = (910−900)/6.25 = 1.6",
        "k": "n"
       },
       {
        "t": "P = Φ(1.6) − Φ(−0.8) = 0.9452 − 0.2119 = 0.733",
        "k": "exam"
       }
      ]
     },
     {
      "t": "Example 6.2",
      "k": "ex",
      "note": "A: μ=1400, σ=200. B: μ=1200, σ=100. n = 125 each. P(X̄A − X̄B ≥ 160)",
      "kids": [
       {
        "t": "mean = 200, sd = √(200²/125 + 100²/125) = √400 = 20",
        "k": "n"
       },
       {
        "t": "z = (160−200)/20 = −2 → P(Z ≥ −2) = 0.977",
        "k": "exam"
       }
      ]
     }
    ],
    "ar": "الـ σ/√n جاية من Chapter 5: Var(ΣXᵢ/n) = nσ²/n² = σ²/n."
   },
   {
    "t": "Chi-squared χ²(ν)",
    "sec": "s3",
    "kids": [
     {
      "t": "Intuition",
      "k": "n",
      "note": "a \"total squared error\"",
      "d": "Take ν standard normals, square each (so signs don't cancel), and add them. It is always positive and skewed right."
     },
     {
      "t": "U = Z₁² + … + Zν² ~ χ²(ν)",
      "k": "def",
      "note": "square ν standard normals and add them",
      "ar": "χ² = مجموع مربعات ν من الـ Z."
     },
     {
      "t": "Mean = ν",
      "k": "def",
      "note": "Variance = 2ν"
     },
     {
      "t": "Independent χ²'s add",
      "k": "exam",
      "note": "χ²(a) + χ²(b) = χ²(a+b)"
     },
     {
      "t": "Theorem 6.4: (n−1)S²/σ² ~ χ²(n−1)",
      "k": "exam",
      "note": "for a normal sample",
      "kids": [
       {
        "t": "X̄ and S² are independent",
        "k": "n"
       }
      ]
     },
     {
      "t": "Why n−1, not n?",
      "k": "warn",
      "note": "we used X̄ instead of the true μ, which costs one degree of freedom",
      "ar": "ولما نستخدم S² بنخسر درجة حرية فبتبقى n−1."
     },
     {
      "t": "E(S²) = σ²",
      "k": "n"
     },
     {
      "t": "Var(S²) = 2σ⁴/(n−1)",
      "k": "n"
     },
     {
      "t": "Notation χ²α,ν",
      "k": "n",
      "note": "the point with area α to the right",
      "kids": [
       {
        "t": "χ²0.05,12 = 21.03",
        "k": "ex"
       }
      ]
     }
    ]
   },
   {
    "t": "Student's t(r)",
    "sec": "s4",
    "kids": [
     {
      "t": "Intuition",
      "k": "n",
      "note": "σ is unknown in real life, so we replace it with S",
      "d": "But S also varies from sample to sample, especially for small n. That extra uncertainty gives the same bell shape with heavier tails."
     },
     {
      "t": "T = Z / √(U/r) ~ t(r)",
      "k": "def",
      "note": "Z ~ N(0,1), U ~ χ²(r), independent"
     },
     {
      "t": "(X̄ − μ)/(S/√n) ~ t(n−1)",
      "k": "exam",
      "note": "for a normal sample",
      "ar": "لما σ مش معروفة والعينة صغيرة استخدم t بدل Z. الـ d.f. = n−1."
     },
     {
      "t": "Properties",
      "k": "cls",
      "kids": [
       {
        "t": "Symmetric about 0, so t1−α = −tα",
        "k": "n"
       },
       {
        "t": "As d.f. grows, t becomes N(0,1)",
        "k": "n",
        "note": "close enough for d.f. > 30"
       }
      ]
     },
     {
      "t": "t0.025,5 = 2.571",
      "k": "ex"
     }
    ]
   },
   {
    "t": "F(r₁, r₂)",
    "sec": "s5",
    "kids": [
     {
      "t": "Intuition",
      "k": "n",
      "note": "F compares two variances",
      "d": "If they are equal, the ratio is near 1."
     },
     {
      "t": "F = (U₁/r₁)/(U₂/r₂) ~ F(r₁, r₂)",
      "k": "def",
      "note": "U₁ ~ χ²(r₁), U₂ ~ χ²(r₂), independent"
     },
     {
      "t": "(S₁²/σ₁²)/(S₂²/σ₂²) ~ F(n₁−1, n₂−1)",
      "k": "exam",
      "note": "two normal samples"
     },
     {
      "t": "Handy facts",
      "k": "cls",
      "kids": [
       {
        "t": "1/F ~ F(r₂, r₁)",
        "k": "n"
       },
       {
        "t": "If T ~ t(ν), then T² ~ F(1, ν)",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "The Family Tree",
    "sec": "s6",
    "kids": [
     {
      "t": "Memorize this",
      "k": "exam",
      "note": "every \"state the distribution\" question is just matching the expression to one of these patterns"
     },
     {
      "t": "Z ~ N(0,1)",
      "k": "def",
      "note": "square & add ν of them → χ²(ν)"
     },
     {
      "t": "Z and U ~ χ²(r)",
      "k": "def",
      "note": "Z / √(U/r) → t(r)"
     },
     {
      "t": "χ²(r₁) and χ²(r₂)",
      "k": "def",
      "note": "(U₁/r₁)/(U₂/r₂) → F(r₁, r₂)"
     },
     {
      "t": "t(ν) squared",
      "k": "def",
      "note": "→ F(1, ν)"
     },
     {
      "t": "Tip: Xᵢ ~ N(0,σ²)",
      "k": "ex",
      "note": "σ cancels in ratios",
      "kids": [
       {
        "t": "(X₁²+X₂²)/(X₃²+X₄²) ~ F(2,2)",
        "k": "exam"
       }
      ]
     }
    ]
   },
   {
    "t": "Problem-Solving Toolkit",
    "sec": "s7",
    "kids": [
     {
      "t": "5-step recipe for any problem",
      "k": "exam",
      "kids": [
       {
        "t": "1. What is random?",
        "k": "n",
        "note": "X, X̄, S², a sum, a ratio"
       },
       {
        "t": "2. Write its mean and sd",
        "k": "n",
        "note": "for X̄: μ and σ/√n"
       },
       {
        "t": "3. Standardize",
        "k": "n",
        "note": "z = (value − mean)/sd"
       },
       {
        "t": "4. Name the distribution and its d.f.",
        "k": "n"
       },
       {
        "t": "5. Sketch the curve and shade the area",
        "k": "n",
        "note": "then use the table"
       }
      ]
     },
     {
      "t": "Distribution Detective",
      "k": "n",
      "note": "interactive tool on the page"
     },
     {
      "t": "Calculator 1: X̄ probabilities",
      "k": "n",
      "kids": [
       {
        "t": "One population",
        "k": "n"
       },
       {
        "t": "Two populations: X̄₁ − X̄₂",
        "k": "n"
       },
       {
        "t": "Event: a < X̄ < b,  X̄ > a,  X̄ < a",
        "k": "n"
       }
      ]
     },
     {
      "t": "Calculator 2: the tables",
      "k": "n",
      "kids": [
       {
        "t": "t(ν), χ²(ν), F(r₁,r₂), Z ~ N(0,1)",
        "k": "n"
       },
       {
        "t": "Given α → find the upper point",
        "k": "n"
       },
       {
        "t": "Given x → find probabilities",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "MCQ Quiz and Practice",
    "sec": "s8",
    "kids": [
     {
      "t": "MCQ Quiz",
      "k": "n",
      "note": "24 questions, one at a time, with a score"
     },
     {
      "t": "Practice generator",
      "k": "n",
      "note": "unlimited questions with XP, streak and level",
      "kids": [
       {
        "t": "Mixed",
        "k": "n"
       },
       {
        "t": "X̄ probability",
        "k": "n"
       },
       {
        "t": "X̄₁ − X̄₂ probability",
        "k": "n"
       },
       {
        "t": "Table lookup (t / χ²)",
        "k": "n"
       },
       {
        "t": "State the distribution (MCQ)",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Exercises from Your Sheet",
    "sec": "s10",
    "kids": [
     {
      "t": "[1] μ=800, σ=40, n=36",
      "k": "ex",
      "note": "sd(X̄) = 40/6 = 6.667",
      "kids": [
       {
        "t": "(a) z = ±1.5 → 2Φ(1.5) − 1 = 0.8664",
        "k": "n"
       },
       {
        "t": "(b) z = 2.25 → 1 − Φ(2.25) = 0.0122",
        "k": "n"
       }
      ]
     },
     {
      "t": "[2] A (4000, 300, n=100), B (4500, 200, n=50)",
      "k": "ex",
      "note": "mean = 500, var = 1700, sd = 41.23",
      "kids": [
       {
        "t": "P(X̄B − X̄A ≥ 600): z = 2.43 → ≈ 0.0077",
        "k": "n"
       },
       {
        "t": "P(≥ 450): z = −1.21 → ≈ 0.887",
        "k": "n"
       }
      ]
     },
     {
      "t": "[3] t probabilities",
      "k": "ex",
      "kids": [
       {
        "t": "(a) 1 − 0.005 − 0.01 = 0.985",
        "k": "n"
       },
       {
        "t": "(b) 0.975",
        "k": "n"
       }
      ]
     },
     {
      "t": "[4] n = 24 (ν = 23): find K",
      "k": "ex",
      "kids": [
       {
        "t": "(a) K = 2.500",
        "k": "n"
       },
       {
        "t": "(b) K = 1.319",
        "k": "n"
       },
       {
        "t": "(c) 0.05 in each tail → K = 1.714",
        "k": "n"
       }
      ]
     },
     {
      "t": "[5] X~N(0,16), Y~N(5,4), U~χ²(4), V~χ²(16)",
      "k": "ex",
      "kids": [
       {
        "t": "(a) (X/4)² + ((Y−5)/2)² → χ²(2)",
        "k": "n"
       },
       {
        "t": "(b) X/√V = (X/4)/√(V/16) → t(16)",
        "k": "n"
       },
       {
        "t": "(c) 4U/V = (U/4)/(V/16) → F(4,16)",
        "k": "n"
       },
       {
        "t": "(d) X+2Y → N(10, 32)",
        "k": "n"
       },
       {
        "t": "(e) 2X−Y → N(−5, 68)",
        "k": "n"
       }
      ]
     },
     {
      "t": "[6a] and [7a]",
      "k": "ex",
      "kids": [
       {
        "t": "3X₁ − 5X₂ + 8 ~ N(8, 34σ²)",
        "k": "n"
       },
       {
        "t": "5X₁ − 7X₂ + 2 ~ N(2, 74σ²)",
        "k": "n"
       }
      ]
     },
     {
      "t": "[8] (X₁²+X₂²)/(X₃²+X₄²)",
      "k": "ex",
      "note": "σ² cancels; each part is χ²(2) over its d.f.",
      "kids": [
       {
        "t": "→ F(2,2), answer (c)",
        "k": "exam"
       }
      ]
     },
     {
      "t": "[9] W = X² + U + V",
      "k": "ex",
      "note": "X² ~ χ²(1)",
      "kids": [
       {
        "t": "W ~ χ²(1+4+16) = χ²(21)",
        "k": "exam"
       }
      ]
     },
     {
      "t": "[10] Z = X̄ − 2Ȳ + 3",
      "k": "ex",
      "note": "n=10 from N(4,9), n=20 from N(5,16)",
      "kids": [
       {
        "t": "X̄ ~ N(4, 0.9), Ȳ ~ N(5, 0.8)",
        "k": "n"
       },
       {
        "t": "mean = −3, var = 0.9 + 4(0.8) = 4.1 → Z ~ N(−3, 4.1)",
        "k": "exam"
       }
      ]
     },
     {
      "t": "[11] Show T ~ t(ν) ⟹ T² ~ F(1,ν)",
      "k": "ex",
      "kids": [
       {
        "t": "T = Z/√(U/ν), so T² = (Z²/1)/(U/ν)",
        "k": "n"
       },
       {
        "t": "Z² ~ χ²(1), U ~ χ²(ν), independent → T² ~ F(1,ν)",
        "k": "n"
       }
      ]
     },
     {
      "t": "[12a] 2X − 3Y + 5",
      "k": "ex",
      "note": "X~N(1,16), Y~N(0,4)",
      "kids": [
       {
        "t": "mean = 7, var = 4(16) + 9(4) = 100 → N(7,100), option ii",
        "k": "n"
       }
      ]
     }
    ]
   },
   {
    "t": "Cheat Sheet and Traps",
    "sec": "s11",
    "kids": [
     {
      "t": "Which distribution?",
      "k": "cls",
      "note": "statistic · condition · result",
      "kids": [
       {
        "t": "(X̄−μ)/(σ/√n)",
        "k": "def",
        "note": "normal population, or n ≥ 30 → N(0,1)"
       },
       {
        "t": "(X̄−μ)/(S/√n)",
        "k": "def",
        "note": "n ≥ 30 → ≈ N(0,1)"
       },
       {
        "t": "(X̄−μ)/(S/√n)",
        "k": "def",
        "note": "normal population, n < 30, σ unknown → t(n−1)"
       },
       {
        "t": "(n−1)S²/σ²",
        "k": "def",
        "note": "normal population → χ²(n−1)"
       },
       {
        "t": "(S₁²/σ₁²)/(S₂²/σ₂²)",
        "k": "def",
        "note": "two independent normal samples → F(n₁−1, n₂−1)"
       }
      ]
     },
     {
      "t": "Common mistakes",
      "k": "warn",
      "kids": [
       {
        "t": "Using σ instead of σ/√n for X̄",
        "k": "warn"
       },
       {
        "t": "Subtracting variances for X̄₁ − X̄₂",
        "k": "warn",
        "note": "they add"
       },
       {
        "t": "Using χ²(n) instead of χ²(n−1) with S²",
        "k": "warn"
       },
       {
        "t": "Forgetting that tables give the area to the right",
        "k": "warn"
       },
       {
        "t": "Not sketching the area first",
        "k": "warn"
       }
      ]
     },
     {
      "t": "Typos in your notes",
      "k": "warn",
      "kids": [
       {
        "t": "MINITAB example",
        "k": "warn",
        "note": "says χ²0.5,12; it should be χ²0.05,12 = 21.03"
       },
       {
        "t": "Example 6.1",
        "k": "warn",
        "note": "shows P(−8.0<Z<1.6); it should be −0.8 (answer 0.733 is right)"
       },
       {
        "t": "Example 6.2",
        "k": "warn",
        "note": "ends with \"600\"; it should be 160"
       },
       {
        "t": "\"t is always greater than 1\"",
        "k": "warn",
        "note": "inaccurate: the idea is that t has more spread than Z"
       }
      ]
     }
    ]
   }
  ]
 }
};
